/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Body, Param, Req, Res, Next } from '@nestjs/common';
import { FeedbackService, FeedbackEntry } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';

interface RateLimitedRequest extends Request {
  rateLimit: {
    resetTime: Date;
  };
}

const postRateLimit = rateLimit({
  windowMs: 10 * 1000, // 10 segundos
  max: 1, // Limitar cada IP a 1 solicitud por ventana de tiempo (10 segundos)
  handler: (req: RateLimitedRequest, res: Response) => {
    const retryAfter = Math.ceil((req.rateLimit.resetTime.getTime() - new Date().getTime()) / 1000);
    res.setHeader('Retry-After', String(retryAfter));
    res.status(429).json({
      message: `You can only submit feedback once every 10 seconds. Please try again in ${retryAfter} seconds.`,
    });
  },
});

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Get()
  getAllFeedback() {
    return this.feedbackService.getAllFeedback();
  }

  @Post()
  submitFeedback(
    @Req() req: RateLimitedRequest,
    @Res() res: Response,
    @Next() next: NextFunction,
    @Body() createFeedbackDto: CreateFeedbackDto
  ) {
    postRateLimit(req, res, () => {
      const feedback = this.feedbackService.submitFeedback(createFeedbackDto);
      res.json(feedback);
    });
  }
  @Put(':id')
  updateFeedback(@Param('id') id: number, @Body() updateFeedbackDto: UpdateFeedbackDto): FeedbackEntry | { error: string } {
    return this.feedbackService.updateFeedback(id, updateFeedbackDto);
  }

  @Delete(':id')
  deleteFeedback(@Param('id') id: number) {
    return this.feedbackService.deleteFeedback(id);
  }
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';

export interface FeedbackEntry {
  id: number;
  name: string;
  feedback: string;
}

@Injectable()
export class FeedbackService {
  private feedbackEntries: FeedbackEntry[] = [];
  private currentId = 1;

  getAllFeedback(): FeedbackEntry[] {
    return this.feedbackEntries;
  }

  submitFeedback(createFeedbackDto: CreateFeedbackDto): FeedbackEntry {
    const newEntry: FeedbackEntry = { id: this.currentId++, ...createFeedbackDto };
    this.feedbackEntries.push(newEntry);
    return newEntry;
  }

  updateFeedback(id: number, updateFeedbackDto: UpdateFeedbackDto): FeedbackEntry | { error: string } {
    const entryIndex = this.feedbackEntries.findIndex(entry => entry.id === id);
    if (entryIndex === -1) {
      return { error: 'Feedback entry not found' };
    }
    this.feedbackEntries[entryIndex] = { ...this.feedbackEntries[entryIndex], ...updateFeedbackDto };
    return this.feedbackEntries[entryIndex];
  }

  deleteFeedback(id: number): { message: string } | { error: string } {
    const entryIndex = this.feedbackEntries.findIndex(entry => entry.id === id);
    if (entryIndex === -1) {
      return { error: 'Feedback entry not found' };
    }
    this.feedbackEntries.splice(entryIndex, 1);
    return { message: 'Feedback entry deleted successfully' };
  }
}

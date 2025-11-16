/**
 * VoteManager - In-memory storage for active votes
 * Note: For production use, consider using a database to persist votes across bot restarts
 */
class VoteManager {
  constructor() {
    // channelId -> { question, options: [{label, value, count}], votes: Map<userId, optionValue> }
    this.activeVotes = new Map();
  }

  createVote(channelId, question, options) {
    const voteData = {
      question,
      options: options.map(opt => ({
        label: opt,
        value: opt.toLowerCase().replace(/\s+/g, '_'),
        count: 0
      })),
      votes: new Map() // userId -> optionValue
    };
    this.activeVotes.set(channelId, voteData);
    return voteData;
  }

  recordVote(channelId, userId, optionValue) {
    const voteData = this.activeVotes.get(channelId);
    if (!voteData) return false;

    // If user already voted, remove their previous vote
    if (voteData.votes.has(userId)) {
      const prevOptionValue = voteData.votes.get(userId);
      const prevOption = voteData.options.find(opt => opt.value === prevOptionValue);
      if (prevOption) prevOption.count--;
    }

    // Record/Update the vote
    voteData.votes.set(userId, optionValue);
    const option = voteData.options.find(opt => opt.value === optionValue);
    if (option) option.count++;

    return true;
  }

  getResults(channelId) {
    const voteData = this.activeVotes.get(channelId);
    if (!voteData) return null;

    const totalVotes = voteData.votes.size;
    const results = voteData.options
      .filter(opt => opt.count > 0 || totalVotes === 0)
      .map(opt => ({
        ...opt,
        percentage: totalVotes > 0 ? ((opt.count / totalVotes) * 100).toFixed(1) : '0.0'
      }));

    return {
      question: voteData.question,
      totalVotes,
      results
    };
  }

  endVote(channelId) {
    const results = this.getResults(channelId);
    this.activeVotes.delete(channelId);
    return results;
  }

  hasActiveVote(channelId) {
    return this.activeVotes.has(channelId);
  }
}

export default new VoteManager();
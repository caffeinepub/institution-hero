import Map "mo:core/Map";
import Array "mo:core/Array";
import List "mo:core/List";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

actor {
  // Types
  type LeadershipWordSubmission = {
    word : Text;
    why : Text;
    roleModel : Text;
    resilienceExample : Text;
    actionStep : Text;
  };

  type ChallengeType = {
    #academicPressure;
    #mentalHealth;
    #financialStress;
    #onlineLearning;
    #timeManagement;
    #bullying;
    #socialIsolation;
  };

  type ResilientLeadershipActivity = {
    challengeType : ?ChallengeType;
    customChallenge : ?Text;
    villainResponse : Text;
    heroicResponse : Text;
    protectiveFactor : Text;
    microSolution : Text;
  };

  // Map for Leadership Word submissions
  let leadershipWords = Map.empty<Principal, LeadershipWordSubmission>();

  let leadershipWordCounts = Map.empty<Text, Nat>();

  // List for Resilient Leadership Activities
  let leadershipActivities = List.empty<ResilientLeadershipActivity>();

  // Public API

  public shared ({ caller }) func submitLeadershipWord(word : Text, why : Text, roleModel : Text, resilienceExample : Text, actionStep : Text) : async () {
    let submission : LeadershipWordSubmission = {
      word;
      why;
      roleModel;
      resilienceExample;
      actionStep;
    };

    // Store submission
    leadershipWords.add(caller, submission);

    // Update word count
    let currentCount = switch (leadershipWordCounts.get(word)) {
      case (null) { 0 };
      case (?count) { count };
    };
    leadershipWordCounts.add(word, currentCount + 1);
  };

  public shared ({ caller }) func submitResilientLeadershipActivity(
    challengeType : ?ChallengeType,
    customChallenge : ?Text,
    villainResponse : Text,
    heroicResponse : Text,
    protectiveFactor : Text,
    microSolution : Text,
  ) : async () {
    switch (customChallenge, challengeType) {
      case (?custom, null) {
        if (custom.size() == 0) {
          Runtime.trap("Please provide at least a core Leadership Challenge.");
        };
      };
      case (null, ?_coreType) { () };
      case (?_custom, ?_coreType) { () };
    };

    let activity : ResilientLeadershipActivity = {
      challengeType;
      customChallenge;
      villainResponse;
      heroicResponse;
      protectiveFactor;
      microSolution;
    };
    leadershipActivities.add(activity);
  };

  public query ({ caller }) func getLeadershipWordCounts() : async [(Text, Nat)] {
    leadershipWordCounts.toArray();
  };

  public query ({ caller }) func getAllMicroSolutions() : async [ResilientLeadershipActivity] {
    leadershipActivities.toArray();
  };

  // For future use, get individual word submissions (not required by UI)
  public query ({ caller }) func getAllLeadershipWordSubmissions() : async [(Principal, LeadershipWordSubmission)] {
    leadershipWords.entries().toArray();
  };

  // Comparison function for sorting (if needed in future)
  module LeadershipWordCount {
    public func compare(a : (Text, Nat), b : (Text, Nat)) : Order.Order {
      Int.compare(b.1, a.1);
    };
  };

  public query ({ caller }) func getTopLeadershipWords() : async [(Text, Nat)] {
    leadershipWordCounts.entries().toArray();
  };
};

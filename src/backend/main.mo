import Map "mo:core/Map";
import List "mo:core/List";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";

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

  type QuoteGenre = {
    #starWars;
    #avengers;
    #batman;
    #harryPotter;
  };

  type Quote = {
    quote : Text;
    attribution : Text;
    genre : QuoteGenre;
  };

  // Persistent Stores
  let leadershipWords = Map.empty<Principal, LeadershipWordSubmission>();
  let leadershipWordCounts = Map.empty<Text, Nat>();
  let leadershipActivities = List.empty<ResilientLeadershipActivity>();

  let activity1Quotes = List.empty<Quote>();
  let activity2Quotes = List.empty<Quote>();
  let activity1State = Map.empty<Principal, Nat>();
  let activity2State = Map.empty<Principal, Nat>();

  // Submission Endpoints
  public shared ({ caller }) func submitLeadershipWord(word : Text, why : Text, roleModel : Text, resilienceExample : Text, actionStep : Text) : async () {
    let submission : LeadershipWordSubmission = {
      word;
      why;
      roleModel;
      resilienceExample;
      actionStep;
    };

    leadershipWords.add(caller, submission);

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
      case (null, null) {
        Runtime.trap("Please select at least a core Leadership Challenge.");
      };
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

  // Quote Cycling Helper Functions
  func getNextQuote(caller : Principal, quotes : List.List<Quote>, state : Map.Map<Principal, Nat>) : ?Quote {
    if (quotes.isEmpty()) {
      return null;
    };

    let currentIndex = switch (state.get(caller)) {
      case (null) { 0 };
      case (?index) { index };
    };

    let quote = quotes.at(currentIndex);
    let nextIndex = (currentIndex + 1) % quotes.size();
    state.add(caller, nextIndex);

    ?quote;
  };

  // Query - Quote Cycling Endpoints
  public shared ({ caller }) func getNextActivity1Quote() : async ?Quote {
    getNextQuote(caller, activity1Quotes, activity1State);
  };

  public shared ({ caller }) func getNextActivity2Quote() : async ?Quote {
    getNextQuote(caller, activity2Quotes, activity2State);
  };

  // Query - Data Retrieval Endpoints
  public query ({ caller }) func getLeadershipWordCounts() : async [(Text, Nat)] {
    leadershipWordCounts.toArray();
  };

  public query ({ caller }) func getAllMicroSolutions() : async [ResilientLeadershipActivity] {
    leadershipActivities.toArray();
  };

  public query ({ caller }) func getAllLeadershipWordSubmissions() : async [(Principal, LeadershipWordSubmission)] {
    leadershipWords.entries().toArray();
  };

  module LeadershipWordCount {
    public func compare(a : (Text, Nat), b : (Text, Nat)) : Order.Order {
      Nat.compare(b.1, a.1);
    };
  };

  public query ({ caller }) func getTopLeadershipWords() : async [(Text, Nat)] {
    leadershipWordCounts.entries().toArray();
  };

  // Update - Populate Quotes
  public shared ({ caller }) func populateActivity1Quotes(quotes : [Quote]) : async () {
    activity1Quotes.clear();
    for (quote in quotes.values()) {
      activity1Quotes.add(quote);
    };
    activity1State.clear();
  };

  public shared ({ caller }) func populateActivity2Quotes(quotes : [Quote]) : async () {
    activity2Quotes.clear();
    for (quote in quotes.values()) {
      activity2Quotes.add(quote);
    };
    activity2State.clear();
  };

  public query ({ caller }) func getAllActivity1Quotes() : async [Quote] {
    activity1Quotes.toArray();
  };

  public query ({ caller }) func getAllActivity2Quotes() : async [Quote] {
    activity2Quotes.toArray();
  };
};

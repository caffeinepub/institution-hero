import Map "mo:core/Map";
import List "mo:core/List";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";



actor {
  // Initialize the access control system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Types
  public type UserProfile = {
    name : Text;
  };

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

  public type QuoteGenre = {
    #starWars;
    #avengers;
    #batman;
    #darkKnightTrilogy;
    #infinite;
    #kingsman;
    #threeKings;
    #transformers;
    #warDogs;
  };

  // Extended quote type with movie reference
  public type Quote = {
    quote : Text;
    attribution : Text;
    movieReference : Text;
    genre : QuoteGenre;
  };

  // Persistent Stores
  let userProfiles = Map.empty<Principal, UserProfile>();
  let leadershipWords = Map.empty<Principal, LeadershipWordSubmission>();
  let leadershipWordCounts = Map.empty<Text, Nat>();
  let leadershipActivities = List.empty<ResilientLeadershipActivity>();

  let activity1Quotes = List.empty<Quote>();
  let activity2Quotes = List.empty<Quote>();
  let activity1State = Map.empty<Principal, Nat>();
  let activity2State = Map.empty<Principal, Nat>();

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Submission Endpoints
  public shared ({ caller }) func submitLeadershipWord(word : Text, why : Text, roleModel : Text, resilienceExample : Text, actionStep : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit leadership words");
    };

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
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit activities");
    };

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
  public shared ({ caller }) func getNextActivity1Quote() : async Quote {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access quotes");
    };

    switch (getNextQuote(caller, activity1Quotes, activity1State)) {
      case (null) {
        let defaultQuotes = getDefaultActivity1Quotes();
        switch (getNextQuote(caller, defaultQuotes, activity1State)) {
          case (null) { Runtime.trap("No quotes available.") };
          case (?quote) { quote };
        };
      };
      case (?quote) { quote };
    };
  };

  public shared ({ caller }) func getNextActivity2Quote() : async Quote {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access quotes");
    };

    switch (getNextQuote(caller, activity2Quotes, activity2State)) {
      case (null) {
        let defaultQuotes = getDefaultActivity2Quotes();
        switch (getNextQuote(caller, defaultQuotes, activity2State)) {
          case (null) { Runtime.trap("No quotes available.") };
          case (?quote) { quote };
        };
      };
      case (?quote) { quote };
    };
  };

  // Query - Data Retrieval Endpoints
  public query ({ caller }) func getLeadershipWordCounts() : async [(Text, Nat)] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view word counts");
    };
    leadershipWordCounts.toArray();
  };

  public query ({ caller }) func getAllMicroSolutions() : async [ResilientLeadershipActivity] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view micro-solutions");
    };
    leadershipActivities.toArray();
  };

  public query ({ caller }) func getAllLeadershipWordSubmissions() : async [(Principal, LeadershipWordSubmission)] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all submissions");
    };
    leadershipWords.entries().toArray();
  };

  module LeadershipWordCount {
    public func compare(a : (Text, Nat), b : (Text, Nat)) : Order.Order {
      Nat.compare(b.1, a.1);
    };
  };

  public query ({ caller }) func getTopLeadershipWords() : async [(Text, Nat)] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view top words");
    };
    leadershipWordCounts.entries().toArray();
  };

  // Update - Populate Quotes (Admin Only)
  public shared ({ caller }) func populateActivity1Quotes(quotes : [Quote]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can populate quotes");
    };

    activity1Quotes.clear();
    for (quote in quotes.values()) {
      activity1Quotes.add(quote);
    };
    activity1State.clear();
  };

  public shared ({ caller }) func populateActivity2Quotes(quotes : [Quote]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can populate quotes");
    };

    activity2Quotes.clear();
    for (quote in quotes.values()) {
      activity2Quotes.add(quote);
    };
    activity2State.clear();
  };

  public query ({ caller }) func getAllActivity1Quotes() : async [Quote] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view quotes");
    };

    if (activity1Quotes.isEmpty()) {
      getDefaultActivity1Quotes().toArray();
    } else {
      activity1Quotes.toArray();
    };
  };

  public query ({ caller }) func getAllActivity2Quotes() : async [Quote] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view quotes");
    };

    if (activity2Quotes.isEmpty()) {
      getDefaultActivity2Quotes().toArray();
    } else {
      activity2Quotes.toArray();
    };
  };

  // Default Quotes with Movie References
  func getDefaultActivity1Quotes() : List.List<Quote> {
    let quotes = List.empty<Quote>();
    quotes.add({
      quote = "Do or do not. There is no try.";
      attribution = "Yoda";
      movieReference = "Star Wars: The Empire Strikes Back";
      genre = #starWars;
    });
    quotes.add({
      quote = "With great power comes great responsibility.";
      attribution = "Uncle Ben";
      movieReference = "Spiderman (Marvel Universe)";
      genre = #avengers;
    });
    quotes.add({
      quote = "It's not who I am underneath, but what I do that defines me.";
      attribution = "Batman";
      movieReference = "Batman Begins (The Dark Knight Trilogy)";
      genre = #batman;
    });
    quotes.add({
      quote = "A leader must have vision, even when the world is chaotic.";
      attribution = "Nick Fury (Inspired)";
      movieReference = "The Avengers (2012)";
      genre = #avengers;
    });
    quotes.add({
      quote = "Don't let fear guide you. Guide your fear.";
      attribution = "Luke Skywalker (Inspired)";
      movieReference = "Star Wars: Return of the Jedi";
      genre = #starWars;
    });
    quotes.add({
      quote = "Resilience is standing up after the fall, not the absence of it.";
      attribution = "Bruce Wayne (Inspired)";
      movieReference = "The Dark Knight Rises";
      genre = #darkKnightTrilogy;
    });
    quotes.add({
      quote = "A true leader makes tough decisions for the greater good.";
      attribution = "Galahad (Inspired)";
      movieReference = "Kingsman: The Secret Service";
      genre = #kingsman;
    });
    quotes.add({
      quote = "Infinite possibilities exist for those who believe.";
      attribution = "Evan McCauley (Inspired)";
      movieReference = "Infinite (2021)";
      genre = #infinite;
    });
    quotes.add({
      quote = "Sometimes you have to break the rules to do the right thing.";
      attribution = "Cade Yeager (Inspired)";
      movieReference = "Transformers: The Last Knight";
      genre = #transformers;
    });
    quotes.add({
      quote = "Even in chaos, order can be found through leadership.";
      attribution = "Sam Witwicky (Inspired)";
      movieReference = "Transformers Series";
      genre = #transformers;
    });
    quotes;
  };

  func getDefaultActivity2Quotes() : List.List<Quote> {
    let quotes = List.empty<Quote>();
    quotes.add({
      quote = "Happiness can be found even in the darkest of times, if one only remembers to turn on the light.";
      attribution = "Albus Dumbledore";
      movieReference = "Harry Potter and the Prisoner of Azkaban";
      genre = #starWars;
    });
    quotes.add({
      quote = "Fear is the path to the dark side. Fear leads to anger, anger leads to hate, hate leads to suffering.";
      attribution = "Yoda";
      movieReference = "Star Wars: The Phantom Menace";
      genre = #starWars;
    });
    quotes.add({
      quote = "I can do this all day.";
      attribution = "Captain America";
      movieReference = "Captain America: The First Avenger";
      genre = #avengers;
    });
    quotes.add({
      quote = "Courage is not the absence of fear, but the triumph over it.";
      attribution = "Wonder Woman (Inspired)";
      movieReference = "Wonder Woman (DC Universe)";
      genre = #avengers;
    });
    quotes.add({
      quote = "A resilient mind is sharper than the strongest sword.";
      attribution = "James Bond (Inspired)";
      movieReference = "James Bond Series";
      genre = #kingsman;
    });
    quotes.add({
      quote = "Resourcefulness is the key to rising above challenges.";
      attribution = "Danny Ocean (Inspired)";
      movieReference = "Ocean's Eleven";
      genre = #kingsman; // Closest fit
    });
    quotes.add({
      quote = "Balance is found by accepting both light and shadow within.";
      attribution = "Anakin Skywalker (Inspired)";
      movieReference = "Star Wars: Revenge of the Sith";
      genre = #starWars;
    });
    quotes.add({
      quote = "Great power rests in the hands of those who accept responsibility.";
      attribution = "Tony Stark (Inspired)";
      movieReference = "Iron Man";
      genre = #avengers;
    });
    quotes.add({
      quote = "Adapt and overcome, for every end is a new beginning.";
      attribution = "Diana Prince (Inspired)";
      movieReference = "Wonder Woman (DC Universe)";
      genre = #avengers; // Closest fit
    });
    quotes.add({
      quote = "A leader's true value lies in the hope they bring to others.";
      attribution = "Optimus Prime (Inspired)";
      movieReference = "Transformers Series";
      genre = #transformers;
    });
    quotes;
  };
};

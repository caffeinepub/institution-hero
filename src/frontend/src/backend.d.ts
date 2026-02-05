import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface LeadershipWordSubmission {
    why: string;
    roleModel: string;
    word: string;
    actionStep: string;
    resilienceExample: string;
}
export interface ResilientLeadershipActivity {
    microSolution: string;
    customChallenge?: string;
    villainResponse: string;
    challengeType?: ChallengeType;
    heroicResponse: string;
    protectiveFactor: string;
}
export interface Quote {
    quote: string;
    genre: QuoteGenre;
    attribution: string;
}
export interface UserProfile {
    name: string;
}
export enum ChallengeType {
    timeManagement = "timeManagement",
    socialIsolation = "socialIsolation",
    mentalHealth = "mentalHealth",
    bullying = "bullying",
    academicPressure = "academicPressure",
    financialStress = "financialStress",
    onlineLearning = "onlineLearning"
}
export enum QuoteGenre {
    starWars = "starWars",
    batman = "batman",
    harryPotter = "harryPotter",
    avengers = "avengers"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllActivity1Quotes(): Promise<Array<Quote>>;
    getAllActivity2Quotes(): Promise<Array<Quote>>;
    getAllLeadershipWordSubmissions(): Promise<Array<[Principal, LeadershipWordSubmission]>>;
    getAllMicroSolutions(): Promise<Array<ResilientLeadershipActivity>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getLeadershipWordCounts(): Promise<Array<[string, bigint]>>;
    getNextActivity1Quote(): Promise<Quote>;
    getNextActivity2Quote(): Promise<Quote>;
    getTopLeadershipWords(): Promise<Array<[string, bigint]>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    populateActivity1Quotes(quotes: Array<Quote>): Promise<void>;
    populateActivity2Quotes(quotes: Array<Quote>): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitLeadershipWord(word: string, why: string, roleModel: string, resilienceExample: string, actionStep: string): Promise<void>;
    submitResilientLeadershipActivity(challengeType: ChallengeType | null, customChallenge: string | null, villainResponse: string, heroicResponse: string, protectiveFactor: string, microSolution: string): Promise<void>;
}

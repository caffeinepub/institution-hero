import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Quote {
    movieReference: string;
    quote: string;
    genre: QuoteGenre;
    attribution: string;
}
export interface UserProfile {
    name: string;
}
export interface ResilientLeadershipActivity {
    microSolution: string;
    customChallenge?: string;
    villainResponse: string;
    challengeType?: ChallengeType;
    heroicResponse: string;
    protectiveFactor: string;
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
    transformers = "transformers",
    batman = "batman",
    threeKings = "threeKings",
    kingsman = "kingsman",
    darkKnightTrilogy = "darkKnightTrilogy",
    avengers = "avengers",
    infinite = "infinite",
    warDogs = "warDogs"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllMicroSolutions(): Promise<Array<ResilientLeadershipActivity>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getLeadershipWordCounts(): Promise<Array<[string, bigint]>>;
    getNextActivity1Quote(): Promise<Quote>;
    getNextActivity2Quote(): Promise<Quote>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitLeadershipWord(word: string, why: string, roleModel: string, resilienceExample: string, actionStep: string): Promise<void>;
    submitResilientLeadershipActivity(challengeType: ChallengeType | null, customChallenge: string | null, villainResponse: string, heroicResponse: string, protectiveFactor: string, microSolution: string): Promise<void>;
}

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
export enum ChallengeType {
    timeManagement = "timeManagement",
    socialIsolation = "socialIsolation",
    mentalHealth = "mentalHealth",
    bullying = "bullying",
    academicPressure = "academicPressure",
    financialStress = "financialStress",
    onlineLearning = "onlineLearning"
}
export interface backendInterface {
    getAllLeadershipWordSubmissions(): Promise<Array<[Principal, LeadershipWordSubmission]>>;
    getAllMicroSolutions(): Promise<Array<ResilientLeadershipActivity>>;
    getLeadershipWordCounts(): Promise<Array<[string, bigint]>>;
    getTopLeadershipWords(): Promise<Array<[string, bigint]>>;
    submitLeadershipWord(word: string, why: string, roleModel: string, resilienceExample: string, actionStep: string): Promise<void>;
    submitResilientLeadershipActivity(challengeType: ChallengeType | null, customChallenge: string | null, villainResponse: string, heroicResponse: string, protectiveFactor: string, microSolution: string): Promise<void>;
}

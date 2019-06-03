    //Requests---------------------------------------------
    export interface ProgramRequest {
      user: string;
      password: string;
      program: Program;
    }

    export interface AuthenticateRequest {
      user: string;
      password: string;
    }    
    
    //Responses--------------------------------------------
    
    export interface SubmissionDetailsResponse {
      initialState: Level;
    steps: Step[];
    outcome: Outcome;
    }
    
    export interface SubmissionsResponse {
      submissions: Submission[];
      levelClosed: boolean;
      level: Level;
    }
    
    export interface ScoreboardResponse {
      scoreboards: Scoreboard[];
    }
    
    
    //Entities---------------------------------------------
    export interface Program {
      rules: Rule[];
    }
    export interface Rule {
      currentState: RuleState | null;
      down: RuleCell | null;
      up: RuleCell | null;
      left: RuleCell | null;
      right: RuleCell | null;
      nextMove: Move;
      nextState: RuleState;
    }
    
    export interface Scoreboard {
      title: string;
      entries: ScoreboardRow[];
    }
    export interface ScoreboardRow {
      user: string;
      solved: number;
      tieBreaker: string;
    }
    
    export interface Submission {
    id: number;
    user: string;
    }

    export interface Level {
    cells: Cell[][];
    objects: Entity[];
    }

    export interface Entity {
    id: number;
    row: number;
    col: number;
    currentMove: Move;
    state: EntityState;
    kind: EntityKind;
    }

    export interface Step {
    objects: Entity[];
    }

    //Enums-----------------------------------------------------------

    export enum Outcome {
    success = "success",
    fail = "fail",
    outOfMoves = "outOfMoves",
    }

    export enum Cell {
    wall = "wall",
    empty = "empty",
    }

    export enum Move {
    down = "down",
    up = "up",
    right = "right",
    left = "left",
    wait = "wait"
    }

    export enum EntityState {
    alive = "alive",
    diesAtEnd = "diesAtEnd",
    diesInMiddle = "diesInMiddle",
    }

    export enum EntityKind {
    berry = "berry",
    ghost = "ghost",
    pacman = "pacman"
    }

    export enum RuleCell {
      wall = "wall",
      empty = "empty",
      ghost = "ghost",
      berry = "berry",
      pacman = "pacman",
    }

    export enum RuleState {
      a = "a",
      b = "b",
      c = "c",
      d = "d",
      e = "e",
      f = "f",
      g = "g",
      h = "h",
    }

    export enum RuleBerry {
      taken = "taken",
      notTaken = "notTaken"
    }

    export enum SubmitResponse {
      ok = "ok",
      rateLimitExceeded = "rateLimitExceeded",
      levelClosed = "levelClosed",
      unauthorized = "unauthorized",
    }
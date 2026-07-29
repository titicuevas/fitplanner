export type WorkoutCategory = {
    id?: number;
    name: string;
};

export type Workout = {
    id: number;
    title: string;
    warmup: string;
    movements: string;
    wod: string;
    duration?: number;
    category?: WorkoutCategory | null;
};

export type WorkoutLog = {
    id: number;
    workout_id: number;
    score?: number | null;
    notes?: string | null;
    completed_at?: string | null;
    workout?: Workout | null;
};

export type WeeklyPlanItem = {
    id?: number;
    user_id?: number;
    workout_id?: number;
    assigned_day: string;
    month?: number;
    completed: boolean;
    workout: Workout;
};

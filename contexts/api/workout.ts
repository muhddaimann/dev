export type WorkoutExercise = {
    id: number;
    name: string;
    type: 'Reps' | 'Duration' | 'Distance';
    sets?: number;
    reps?: number;
    duration?: number;
    distance?: number;
  };
  
  export type WorkoutPlan = {
    id: number;
    name: string;
    exercises: WorkoutExercise[];
    onPress?: () => void;
  };
  
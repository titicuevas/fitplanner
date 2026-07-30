<?php

namespace Tests\Unit;

use App\Models\Category;
use App\Models\Comment;
use App\Models\User;
use App\Models\WeeklyPlan;
use App\Models\Workout;
use App\Models\WorkoutLog;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Tests\TestCase;

class ModelRelationsTest extends TestCase
{
    public function test_workout_relations_have_expected_types(): void
    {
        $workout = new Workout();

        $this->assertInstanceOf(BelongsTo::class, $workout->category());
        $this->assertInstanceOf(HasMany::class, $workout->logs());
        $this->assertInstanceOf(HasMany::class, $workout->comments());
        $this->assertInstanceOf(HasMany::class, $workout->weeklyPlans());
        $this->assertInstanceOf(BelongsToMany::class, $workout->users());
    }

    public function test_user_relations_have_expected_types(): void
    {
        $user = new User();

        $this->assertInstanceOf(HasMany::class, $user->weeklyPlans());
        $this->assertInstanceOf(BelongsToMany::class, $user->workouts());
        $this->assertInstanceOf(BelongsToMany::class, $user->completedWorkouts());
        $this->assertInstanceOf(HasMany::class, $user->workoutLogs());
    }

    public function test_other_domain_models_have_expected_relations(): void
    {
        $this->assertInstanceOf(BelongsTo::class, (new WeeklyPlan())->user());
        $this->assertInstanceOf(BelongsTo::class, (new WeeklyPlan())->workout());
        $this->assertInstanceOf(BelongsTo::class, (new WorkoutLog())->user());
        $this->assertInstanceOf(BelongsTo::class, (new WorkoutLog())->workout());
        $this->assertInstanceOf(BelongsTo::class, (new Comment())->user());
        $this->assertInstanceOf(BelongsTo::class, (new Comment())->workout());
        $this->assertInstanceOf(HasMany::class, (new Category())->workouts());
    }
}

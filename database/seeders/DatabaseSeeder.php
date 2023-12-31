<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use App\Models\Rating;
use App\Models\Amenity;
use App\Models\Booking;
use App\Models\Category;
use App\Models\Property;
use App\Models\Province;
use App\Models\Transaction;
use Illuminate\Support\Arr;
use App\Models\PropertyImage;
use App\Models\PropertyAmenity;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Database\Factories\BookingFactory;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        // Property::factory()->count(3000)->create();

        // $provinces = Province::pluck('code');
        // $province_id = fake()->randomElement($provinces);
        // $categories = Category::pluck('id')->toArray();        
        // $category_array = array_diff($categories,['26','27','28','32','36']);


        // foreach ($provinces as $property) {
        //     foreach($category_array as $category){
        //         $random_count = fake()->numberBetween(10,100);
        //         Property::factory()->state([
        //             'provinces_id' => $property      ,
        //             'category_id' => $category              
        //         ])->count($random_count)->create();
        //     }            
        // }

        // $properties = Property::pluck('id');

        // foreach ($properties as $property) {
        //     $property_images = PropertyImage::where('property_id', $property)->first();
        //     if (!$property_images) {
        //         for ($i = 0; $i < 8; $i++) {
        //             PropertyImage::factory()->state([
        //                 'property_id' => $property
        //             ])->create();
        //         }
        //     }
        // }

        // Booking::factory()->state(['user_id'=> 43])->count(1)->create();

        // $users = User::pluck('id');


        // foreach($users as $user){
        //     Booking::factory()->state(['user_id'=> $user])->count(fake()->numberBetween(8, 15))->create();
        // }


        // $users = User::pluck('id');
        // foreach($users as $user){
        //     Rating::factory()->state([
        //         'renter_id' => $user
        //     ])->count(20)->create();
        // }

        // $users = User::pluck('id');
        // foreach ($users as $user) {
        //     Rating::factory()->state([
        //         'renter_id' => $user
        //     ])->count(5)->create();
        // }


        // $users = User::pluck('id');
        // foreach ($users as $item) {

        //     $created_at = fake()->dateTimeBetween('2021-01-01', '2022-01-01');
        //     $updated_at = $created_at;
        //     User::where('id', $item)->update(['created_at' => $created_at, 'updated_at' => $updated_at]);
        // }




        // $properties = Property::pluck('id');
        // foreach ($properties as $property) {
        //     $property_images = PropertyImage::where('property_id', $property)->first();
        //     if (!$property_images) {
        //         for ($i = 0; $i < 5; $i++) {
        //             PropertyImage::factory()->state([
        //                 'property_id' => $property
        //             ])->create();
        //         }
        //     }
        // }

        // $amenites = Amenity::pluck('id');
        // $properties = Property::pluck('id');
        // foreach ($properties as $property) {
        //     $amenites_array = [];
        //     foreach ($amenites as $amenity) {
        //         $amenites_array[] = $amenity;
        //     }
        //     $randomAmenites = array_unique(Arr::random($amenites_array, fake()->numberBetween(10, 20)));
        //     foreach ($randomAmenites as $item) {
        //         DB::table('property_amenities')->insert([
        //             'property_id' => $property,
        //             'amenity_id' => $item
        //         ]);
        //     }
        // }


        // ///////////////////////////////////////////////////////////////////////////
        // User::factory()->count(100)->create();


        // Property::factory()->count(2000)->create();



        ///////////////////////////////////////////////////////////////////////////


        // for ($i = 0; $i < 300000; $i++) {
        //     // SELECT * FROM `transactions` WHERE `payment_id` LIKE 'PM%'
        //     Transaction::factory()->state([
        //         'payment_id' => "PM$i"
        //     ])->count(1)->create();
        // }

        //     $users = User::pluck('id');
        //     foreach($users as $user){
        //         Rating::factory()->state([
        //             'renter_id' => $user
        //         ])->count(5)->create();
        //     }
        // }


        // Booking::factory()->count(100000)->create();

        $properties = Property::pluck('id');
        foreach ($properties as $property) {
            Rating::factory()->state([
                'property_id' => $property
            ])->count(2)->create();
        }
    }
}

<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\ProductController;

Route::apiResource('products', ProductController::class);

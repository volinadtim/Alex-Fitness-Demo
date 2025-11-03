<?php

namespace App\Http\Controllers\API;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Http\Controllers\Controller;

class ProductController extends Controller
{
    // GET /api/products - список товаров
    public function index()
    {
        $products = Product::all(['id', 'name', 'description', 'price', 'image_url', 'created_at']);
        return response()->json($products);
    }

    // GET /api/products/{id} - информация о товаре
    public function show($id)
    {
        try {
            $product = Product::findOrFail($id);
            return response()->json($product);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Product not found'], 404);
        }
    }

    // POST /api/products - создание товара
    public function store(Request $request)
    {
        $data = $this->validateData($request);

        $product = Product::create($data);
        return response()->json($product, 201);
    }

    // PUT /api/products/{id} - обновление товара
    public function update(Request $request, $id)
    {
        try {
            $product = Product::findOrFail($id);
            $data = $this->validateData($request);
            $product->update($data);
            return response()->json($product);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Product not found'], 404);
        }
    }

    // DELETE /api/products/{id} - удаление товара
    public function destroy($id)
    {
        try {
            $product = Product::findOrFail($id);
            $product->delete();
            return response()->json(['message' => 'Product deleted']);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Product not found'], 404);
        }
    }

    // Валидация данных запроса
    protected function validateData(Request $request)
    {
        return $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'image_url' => 'nullable|url',
        ]);
    }
}

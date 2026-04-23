<?php

namespace App\Http\Controllers;

use App\Models\Template;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TemplateController extends Controller
{
    public function index()
    {
        return Inertia::render('Templates/Index', [
            'templates' => Template::latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'file' => 'required|file|mimes:pdf,doc,docx,xls,xlsx|max:5120',
            'description' => 'nullable|string'
        ]);

        if ($request->hasFile('file')) {
            $path = $request->file('file')->store('templates', 'public');
            
            Template::create([
                'name' => $request->name,
                'file_path' => $path,
                'description' => $request->description
            ]);
        }

        return back()->with('success', 'Template uploaded successfully.');
    }

    public function destroy(Template $template)
    {
        Storage::disk('public')->delete($template->file_path);
        $template->delete();

        return back()->with('success', 'Template deleted successfully.');
    }
}

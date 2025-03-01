
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Dumbbell, Camera, X, Check, Plus, Image } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";

interface NutritionResult {
  foodName: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  servingSize: string;
}

const NutritionScanner = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [nutritionResult, setNutritionResult] = useState<NutritionResult | null>(null);
  
  const handleCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // Implement video capture logic here
      toast.success("Camera accessed successfully");
      // For demonstration, we'll simulate an image selection
      simulateImageSelection();
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast.error("Could not access camera. Try uploading an image instead.");
    }
  };

  // For demo purposes, simulate selecting an image
  const simulateImageSelection = () => {
    setSelectedImage("/placeholder.svg");
    toast.info("Image selected for analysis");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (e) => {
        if (e.target?.result) {
          setSelectedImage(e.target.result as string);
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setNutritionResult(null);
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    
    // In a real implementation, we would send the image to an API for analysis
    // For demonstration, we'll simulate an API call with a timeout
    setTimeout(() => {
      // Mock result
      const mockResult: NutritionResult = {
        foodName: "Grilled Chicken Salad",
        calories: 320,
        protein: 28,
        carbs: 12,
        fat: 18,
        servingSize: "1 bowl (250g)"
      };
      
      setNutritionResult(mockResult);
      setIsAnalyzing(false);
      toast.success("Food analyzed successfully!");
    }, 3000);
  };

  const saveNutritionData = () => {
    if (!nutritionResult) return;
    
    // In a real implementation, we would save this data to a database
    toast.success("Nutrition data saved to your meal history");
    clearImage();
  };

  const editNutritionData = () => {
    // In a real implementation, this would open a form to edit the data
    toast.info("Edit functionality would open here");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="container pb-20"
    >
      <Header title="Nutrition Scanner" subtitle="AI-Powered" />
      
      <Tabs defaultValue="camera" className="w-full mb-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="camera">
            <div className="flex items-center gap-2">
              <Camera size={16} />
              <span>Camera</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="upload">
            <div className="flex items-center gap-2">
              <Image size={16} />
              <span>Upload</span>
            </div>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="camera" className="py-4">
          <Card className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Take a photo of your food to analyze its nutritional content
              </p>
              <Button onClick={handleCapture} className="w-full">
                <Camera className="mr-2" />
                Open Camera
              </Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="upload" className="py-4">
          <Card className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Upload a photo of your food to analyze its nutritional content
              </p>
              <Button onClick={triggerFileInput} className="w-full">
                <Image className="mr-2" />
                Select Image
              </Button>
              <input 
                ref={fileInputRef}
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                className="hidden" 
              />
            </div>
          </Card>
        </TabsContent>
      </Tabs>
      
      {selectedImage && (
        <div className="mt-6">
          <div className="relative">
            <img 
              src={selectedImage} 
              alt="Food" 
              className="w-full h-60 object-cover rounded-lg" 
            />
            <Button 
              variant="destructive" 
              size="icon" 
              className="absolute top-2 right-2"
              onClick={clearImage}
            >
              <X size={16} />
            </Button>
          </div>
          
          {!nutritionResult && !isAnalyzing && (
            <Button 
              onClick={analyzeImage} 
              className="w-full mt-4"
            >
              Analyze Food
            </Button>
          )}
          
          {isAnalyzing && (
            <div className="mt-6">
              <div className="flex items-center space-x-4 mb-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
              <p className="text-center text-sm text-muted-foreground animate-pulse">
                AI is analyzing your food... Please wait.
              </p>
            </div>
          )}
          
          {nutritionResult && (
            <Card className="mt-6 p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">{nutritionResult.foodName}</h3>
                <Button variant="outline" size="sm" onClick={editNutritionData}>
                  Edit
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center neo-morphism p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground">Calories</p>
                  <p className="text-xl font-semibold">{nutritionResult.calories}</p>
                </div>
                <div className="text-center neo-morphism p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground">Serving</p>
                  <p className="text-xl font-semibold">{nutritionResult.servingSize}</p>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                <div>
                  <Label>Protein</Label>
                  <div className="flex items-center mt-1">
                    <div className="h-2 bg-blue-500 rounded-full mr-2" style={{ width: `${(nutritionResult.protein / 50) * 100}%` }}></div>
                    <span className="text-sm">{nutritionResult.protein}g</span>
                  </div>
                </div>
                <div>
                  <Label>Carbs</Label>
                  <div className="flex items-center mt-1">
                    <div className="h-2 bg-orange-500 rounded-full mr-2" style={{ width: `${(nutritionResult.carbs / 100) * 100}%` }}></div>
                    <span className="text-sm">{nutritionResult.carbs}g</span>
                  </div>
                </div>
                <div>
                  <Label>Fats</Label>
                  <div className="flex items-center mt-1">
                    <div className="h-2 bg-green-500 rounded-full mr-2" style={{ width: `${(nutritionResult.fat / 50) * 100}%` }}></div>
                    <span className="text-sm">{nutritionResult.fat}g</span>
                  </div>
                </div>
              </div>
              
              <Button onClick={saveNutritionData} className="w-full">
                <Check className="mr-2" />
                Save to Meal History
              </Button>
            </Card>
          )}
        </div>
      )}
      
      {!selectedImage && (
        <div className="text-center mt-8">
          <div className="neo-morphism rounded-full mx-auto flex items-center justify-center h-24 w-24 mb-4">
            <Dumbbell className="text-primary" size={40} />
          </div>
          <h3 className="text-lg font-medium mb-2">Track Your Nutrition</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Take a photo of your food and our AI will analyze its nutritional content
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default NutritionScanner;

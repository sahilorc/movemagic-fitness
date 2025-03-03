
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Dumbbell, Camera, X, Check, Image } from "lucide-react";
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [nutritionResult, setNutritionResult] = useState<NutritionResult | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [activeTab, setActiveTab] = useState("camera");
  
  // Handle camera stream cleanup when component unmounts
  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      if (videoRef.current) {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            facingMode: 'environment',
            width: { ideal: 1280 },
            height: { ideal: 720 } 
          } 
        });
        
        videoRef.current.srcObject = stream;
        setCameraActive(true);
        toast.success("Camera activated successfully");
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast.error("Could not access camera. Try uploading an image instead.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageDataUrl = canvas.toDataURL('image/jpeg');
        setSelectedImage(imageDataUrl);
        stopCamera();
        toast.success("Photo captured successfully!");
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (e) => {
        if (e.target?.result) {
          setSelectedImage(e.target.result as string);
          toast.success("Image loaded successfully");
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
    
    try {
      // In a production app, you would send the image to a real API
      // For demo purposes, we'll use a more sophisticated mock
      // that simulates an actual API call with different results based on image
      
      // Create a hash from the image string to simulate different foods
      let hash = 0;
      for (let i = 0; i < selectedImage.length; i++) {
        hash = ((hash << 5) - hash) + selectedImage.charCodeAt(i);
        hash = hash & hash; // Convert to 32bit integer
      }
      
      // Wait for what would be the API processing time
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Use the hash to determine which mock result to show
      const foods = [
        {
          foodName: "Grilled Chicken Salad",
          calories: 320,
          protein: 28,
          carbs: 12,
          fat: 18,
          servingSize: "1 bowl (250g)"
        },
        {
          foodName: "Avocado Toast",
          calories: 380,
          protein: 10,
          carbs: 38,
          fat: 22,
          servingSize: "1 slice (180g)"
        },
        {
          foodName: "Protein Smoothie",
          calories: 290,
          protein: 24,
          carbs: 30,
          fat: 8,
          servingSize: "1 cup (300ml)"
        },
        {
          foodName: "Salmon with Vegetables",
          calories: 430,
          protein: 32,
          carbs: 15,
          fat: 25,
          servingSize: "1 portion (280g)"
        }
      ];
      
      const index = Math.abs(hash) % foods.length;
      setNutritionResult(foods[index]);
      
      toast.success("Food analyzed successfully!");
    } catch (error) {
      console.error("Error analyzing image:", error);
      toast.error("Error analyzing image. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
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

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === "camera") {
      if (!cameraActive) startCamera();
    } else {
      stopCamera();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="container pb-20"
    >
      <Header title="Nutrition Scanner" subtitle="AI-Powered" />
      
      <Tabs defaultValue="camera" className="w-full mb-6" onValueChange={handleTabChange}>
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
            {!selectedImage && (
              <div className="relative w-full">
                {cameraActive ? (
                  <div className="relative">
                    <video 
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full h-60 object-cover rounded-lg"
                    />
                    <Button 
                      onClick={captureImage} 
                      className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
                    >
                      <Camera className="mr-2" />
                      Take Photo
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-4">
                      Take a photo of your food to analyze its nutritional content
                    </p>
                    <Button onClick={startCamera} className="w-full">
                      <Camera className="mr-2" />
                      Open Camera
                    </Button>
                  </div>
                )}
                <canvas ref={canvasRef} className="hidden" />
              </div>
            )}
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

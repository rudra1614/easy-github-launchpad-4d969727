
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Check, Globe, Lock } from "lucide-react";

type Repository = {
  id: string;
  name: string;
  description: string;
  visibility: "public" | "private";
  initialREADME: boolean;
  createdAt: Date;
};

interface CreateRepoFormProps {
  onRepoCreated: (repo: Repository) => void;
}

const CreateRepoForm = ({ onRepoCreated }: CreateRepoFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    visibility: "public" as "public" | "private",
    initialREADME: true
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleVisibilityChange = (value: "public" | "private") => {
    setFormData(prev => ({ ...prev, visibility: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, initialREADME: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Repository name is required",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newRepo: Repository = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        createdAt: new Date()
      };
      
      onRepoCreated(newRepo);
      
      toast({
        title: "Repository Created",
        description: `Successfully created ${formData.name}`,
        action: (
          <div className="h-8 w-8 bg-github-green rounded-full flex items-center justify-center">
            <Check className="h-5 w-5 text-white" />
          </div>
        ),
      });
      
      // Reset form
      setFormData({
        name: "",
        description: "",
        visibility: "public",
        initialREADME: true
      });
      
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border-github-gray/20">
      <CardHeader>
        <CardTitle className="text-2xl">Create a new repository</CardTitle>
        <CardDescription>
          A repository contains all project files, including the revision history.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Repository name <span className="text-red-500">*</span></Label>
            <Input
              id="name"
              name="name"
              placeholder="my-awesome-project"
              value={formData.name}
              onChange={handleChange}
              className="focus-visible:ring-github-blue"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description <span className="text-gray-400">(optional)</span></Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Short description of your repository"
              value={formData.description}
              onChange={handleChange}
              className="resize-none focus-visible:ring-github-blue"
              rows={3}
            />
          </div>
          
          <div className="space-y-3 pt-4">
            <h3 className="font-medium">Visibility</h3>
            <RadioGroup 
              value={formData.visibility} 
              onValueChange={handleVisibilityChange as (value: string) => void}
              className="flex flex-col space-y-3"
            >
              <div className="flex items-center space-x-3 border rounded-md p-3 hover:bg-muted/50 cursor-pointer">
                <RadioGroupItem value="public" id="public" className="data-[state=checked]:border-github-blue data-[state=checked]:bg-github-blue" />
                <Label htmlFor="public" className="flex items-center cursor-pointer">
                  <Globe className="h-5 w-5 mr-2 text-github-gray" />
                  <div className="space-y-0.5">
                    <span className="font-medium">Public</span>
                    <p className="text-sm text-muted-foreground">Anyone on the internet can see this repository</p>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-3 border rounded-md p-3 hover:bg-muted/50 cursor-pointer">
                <RadioGroupItem value="private" id="private" className="data-[state=checked]:border-github-blue data-[state=checked]:bg-github-blue" />
                <Label htmlFor="private" className="flex items-center cursor-pointer">
                  <Lock className="h-5 w-5 mr-2 text-github-gray" />
                  <div className="space-y-0.5">
                    <span className="font-medium">Private</span>
                    <p className="text-sm text-muted-foreground">You choose who can see and commit to this repository</p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="pt-2 space-y-4">
            <h3 className="font-medium">Initialize this repository with:</h3>
            <div className="flex items-center space-x-3">
              <Switch 
                id="readme" 
                checked={formData.initialREADME}
                onCheckedChange={handleSwitchChange}
                className="data-[state=checked]:bg-github-blue"
              />
              <Label htmlFor="readme" className="cursor-pointer">
                <span className="font-medium">Add a README file</span>
                <p className="text-sm text-muted-foreground">This is where you can write a long description for your project</p>
              </Label>
            </div>
          </div>
          
          <div className="pt-4">
            <Button 
              type="submit" 
              className="bg-github-green hover:bg-github-green/90 text-white" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating repository..." : "Create repository"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateRepoForm;

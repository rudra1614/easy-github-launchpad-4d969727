
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { GitBranch, GitFork, Star, Lock, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

type Repository = {
  id: string;
  name: string;
  description: string;
  visibility: "public" | "private";
  initialREADME: boolean;
  createdAt: Date;
};

interface RepoListProps {
  repositories: Repository[];
}

const RepoList = ({ repositories }: RepoListProps) => {
  if (repositories.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <h2 className="text-xl font-semibold mb-4 border-b pb-2">Your Repositories</h2>
      <div className="grid gap-4">
        {repositories.map((repo) => (
          <Card key={repo.id} className="bg-white hover:border-github-gray/30 transition-all">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                  <GitBranch className="h-5 w-5 text-github-gray" />
                  <CardTitle className="text-lg text-github-blue">{repo.name}</CardTitle>
                  <Badge 
                    variant="outline" 
                    className={`flex items-center gap-1 ${
                      repo.visibility === 'private' 
                        ? 'border-github-red/30 text-github-red' 
                        : 'border-github-green/30 text-github-green'
                    }`}
                  >
                    {repo.visibility === 'private' ? (
                      <><Lock className="h-3 w-3" /> Private</>
                    ) : (
                      <><Globe className="h-3 w-3" /> Public</>
                    )}
                  </Badge>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="h-7 text-xs">
                    <Star className="h-3.5 w-3.5 mr-1" />
                    Star
                  </Button>
                  <Button variant="outline" size="sm" className="h-7 text-xs">
                    <GitFork className="h-3.5 w-3.5 mr-1" />
                    Fork
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                {repo.description || "No description provided"}
              </p>
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground">
              Created {formatDistanceToNow(repo.createdAt)} ago
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RepoList;

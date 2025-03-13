
import { useState } from "react";
import Header from "@/components/Header";
import CreateRepoForm from "@/components/CreateRepoForm";
import RepoList from "@/components/RepoList";

type Repository = {
  id: string;
  name: string;
  description: string;
  visibility: "public" | "private";
  initialREADME: boolean;
  createdAt: Date;
};

const Index = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);

  const handleRepoCreated = (repo: Repository) => {
    setRepositories(prev => [repo, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 container py-6 px-4 md:py-10">
        <CreateRepoForm onRepoCreated={handleRepoCreated} />
        <RepoList repositories={repositories} />
      </main>
      <footer className="bg-white border-t py-6 text-center text-sm text-muted-foreground">
        <div className="container">
          GitHub Launchpad • Made with ♥ • {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
};

export default Index;


import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-lottery-background p-4 bg-gradient-to-b from-lottery-primary/10 to-lottery-background">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 text-lottery-primary">404</h1>
        <p className="text-xl text-gray-600 mb-6">Página não encontrada</p>
        <Button 
          variant="default" 
          onClick={() => window.location.href = "/"}
          className="bg-lottery-primary hover:bg-lottery-primary/80"
        >
          Voltar à página inicial
        </Button>
      </div>
    </div>
  );
};

export default NotFound;


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface DrawResult {
  id: number;
  date: string;
  numbers: string[];
  prize: string;
}

const Results = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<DrawResult[]>([
    {
      id: 5789,
      date: "08/05/2025",
      numbers: ["1º 23456", "2º 34567", "3º 45678", "4º 56789", "5º 67890"],
      prize: "R$ 500.000,00"
    },
    {
      id: 5788,
      date: "06/05/2025",
      numbers: ["1º 12345", "2º 23456", "3º 34567", "4º 45678", "5º 56789"],
      prize: "R$ 500.000,00"
    },
    {
      id: 5787,
      date: "03/05/2025",
      numbers: ["1º 98765", "2º 87654", "3º 76543", "4º 65432", "5º 54321"],
      prize: "R$ 500.000,00"
    }
  ]);
  const [isLiveDrawing, setIsLiveDrawing] = useState(false);

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("isAuthenticated") === "true";
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const toggleLiveDraw = () => {
    setIsLiveDrawing(!isLiveDrawing);
  };

  return (
    <div className="min-h-screen bg-lottery-background">
      <header className="bg-lottery-primary text-white py-4 px-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold">Sorteio ao Vivo Federal</h1>
          <Button variant="outline" onClick={handleLogout} className="text-white border-white hover:bg-lottery-primary/80">
            Sair
          </Button>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <Card className={`overflow-hidden ${isLiveDrawing ? 'border-2 border-lottery-accent' : ''}`}>
            <CardHeader className="bg-lottery-secondary text-white">
              <CardTitle className="flex justify-between items-center">
                <span>Sorteio Atual{isLiveDrawing ? " - AO VIVO" : ""}</span>
                <Button 
                  onClick={toggleLiveDraw}
                  variant={isLiveDrawing ? "destructive" : "secondary"}
                  className={isLiveDrawing ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700 text-white"}
                >
                  {isLiveDrawing ? "Encerrar Sorteio" : "Iniciar Sorteio ao Vivo"}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {isLiveDrawing ? (
                <div className="space-y-4">
                  <p className="text-center font-bold text-lg">Sorteio #5790 em andamento</p>
                  <div className="grid grid-cols-5 gap-3 my-4">
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i} 
                        className="aspect-square rounded-lg bg-lottery-primary/10 flex items-center justify-center animate-pulse-slow border border-lottery-accent"
                      >
                        <span className="text-lg font-bold text-lottery-primary">{i+1}º</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-center text-gray-500">Aguardando extração dos números...</p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Nenhum sorteio em andamento</p>
                  <p className="mt-2 font-medium">Próximo sorteio: 10/05/2025 às 19:00</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-lottery-primary">Resultados Anteriores</h2>
        
        <div className="space-y-4">
          {results.map((result) => (
            <Card key={result.id} className="overflow-hidden">
              <CardHeader className="bg-lottery-primary/10 py-3">
                <CardTitle className="flex justify-between items-center text-base md:text-lg">
                  <span>Concurso #{result.id}</span>
                  <span>{result.date}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-4">
                  {result.numbers.map((number, i) => (
                    <div 
                      key={i} 
                      className="bg-lottery-background rounded p-2 text-center font-mono border border-lottery-secondary/30"
                    >
                      {number}
                    </div>
                  ))}
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between items-center pt-2">
                  <span className="font-medium">Prêmio Principal:</span>
                  <span className="font-bold text-lottery-primary">{result.prize}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Results;

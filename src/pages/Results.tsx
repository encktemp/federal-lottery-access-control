
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

// Mapeamento de números para animais
const animalMapping: Record<number, { name: string, image: string }> = {
  1: { name: "Avestruz", image: "https://static.todamateria.com.br/upload/av/es/avestruz-cke.jpg" },
  2: { name: "Águia", image: "https://static.todamateria.com.br/upload/ag/ui/aguia-cke.jpg" },
  3: { name: "Burro", image: "https://static.todamateria.com.br/upload/bu/rr/burro-cke.jpg" },
  4: { name: "Borboleta", image: "https://static.todamateria.com.br/upload/bo/rb/borboleta-cke.jpg" },
  5: { name: "Cachorro", image: "https://static.todamateria.com.br/upload/ca/ch/cachorro-0-cke.jpg" },
  6: { name: "Cabra", image: "https://static.todamateria.com.br/upload/ca/br/cabra-0-cke.jpg" },
  7: { name: "Carneiro", image: "https://static.todamateria.com.br/upload/ca/rn/carneiro-0-cke.jpg" },
  8: { name: "Camelo", image: "https://static.todamateria.com.br/upload/ca/me/camelo-0-cke.jpg" },
  9: { name: "Cobra", image: "https://static.todamateria.com.br/upload/co/br/cobra-0-cke.jpg" },
  10: { name: "Coelho", image: "https://static.todamateria.com.br/upload/co/el/coelho-0-cke.jpg" },
  11: { name: "Cavalo", image: "https://static.todamateria.com.br/upload/ca/va/cavalo-0-cke.jpg" },
  12: { name: "Elefante", image: "https://static.todamateria.com.br/upload/el/ef/elefante-0-cke.jpg" },
  13: { name: "Galo", image: "https://static.todamateria.com.br/upload/ga/lo/galo-0-cke.jpg" },
  14: { name: "Gato", image: "https://static.todamateria.com.br/upload/ga/to/gato-0-cke.jpg" },
  15: { name: "Jacaré", image: "https://static.todamateria.com.br/upload/ja/ca/jacare-0-cke.jpg" },
  16: { name: "Leão", image: "https://static.todamateria.com.br/upload/le/ao/leao-0-cke.jpg" },
  17: { name: "Macaco", image: "https://static.todamateria.com.br/upload/ma/ca/macaco-0-cke.jpg" },
  18: { name: "Porco", image: "https://static.todamateria.com.br/upload/po/rc/porco-0-cke.jpg" },
  19: { name: "Pavão", image: "https://static.todamateria.com.br/upload/pa/va/pavao-0-cke.jpg" },
  20: { name: "Peru", image: "https://static.todamateria.com.br/upload/pe/ru/peru-0-cke.jpg" },
  21: { name: "Touro", image: "https://static.todamateria.com.br/upload/to/ur/touro-0-cke.jpg" },
  22: { name: "Tigre", image: "https://static.todamateria.com.br/upload/ti/gr/tigre-0-cke.jpg" },
  23: { name: "Urso", image: "https://static.todamateria.com.br/upload/ur/so/urso-0-cke.jpg" },
  24: { name: "Veado", image: "https://static.todamateria.com.br/upload/ve/ad/veado-0-cke.jpg" },
  25: { name: "Vaca", image: "https://static.todamateria.com.br/upload/va/ca/vaca-0-cke.jpg" },
};

// Função para obter animal a partir do número
const getAnimalFromNumber = (number: string) => {
  const lastTwoDigits = parseInt(number.slice(-2));
  const group = lastTwoDigits % 25 || 25; // Se o resto for 0, usamos 25
  return { group, animal: animalMapping[group] };
};

interface ResultItem {
  id: number;
  number: string;
  group: number;
  animal: string;
  image: string;
}

const Results = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<ResultItem[]>([]);
  const [youtubeLink, setYoutubeLink] = useState("");
  const [numberInput, setNumberInput] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("isAuthenticated") === "true";
    if (!isAuthenticated) {
      navigate("/login");
    }

    // Atualizar o relógio a cada segundo
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const handleNumberSubmit = () => {
    if (numberInput.length !== 4 || isNaN(Number(numberInput))) {
      toast.error("Por favor, insira um número válido de 4 dígitos");
      return;
    }

    const { group, animal } = getAnimalFromNumber(numberInput);
    
    // Adicionar à tabela de resultados
    setResults(prev => [
      ...prev,
      {
        id: prev.length + 1,
        number: numberInput,
        group: group,
        animal: animal.name,
        image: animal.image
      }
    ]);

    setNumberInput("");
    toast.success(`Número ${numberInput} adicionado com sucesso!`);
  };

  const clearResults = () => {
    setResults([]);
    toast.info("Tabela de resultados limpa");
  };

  const handleYoutubeEmbed = () => {
    if (!youtubeLink) {
      toast.error("Por favor, insira um link do YouTube");
      return;
    }

    // Implementação básica para exibição de vídeo do YouTube
    if (videoContainerRef.current) {
      let videoId = "";
      
      // Extrair ID do vídeo do YouTube de diferentes formatos de URL
      if (youtubeLink.includes("youtube.com/watch?v=")) {
        videoId = youtubeLink.split("v=")[1].split("&")[0];
      } else if (youtubeLink.includes("youtu.be/")) {
        videoId = youtubeLink.split("youtu.be/")[1];
      } else if (youtubeLink.includes("<iframe")) {
        // Tentar extrair de um iframe embed
        const srcMatch = youtubeLink.match(/src="(.*?)"/);
        if (srcMatch && srcMatch[1]) {
          const srcUrl = srcMatch[1];
          if (srcUrl.includes("youtube.com/embed/")) {
            videoId = srcUrl.split("embed/")[1].split("?")[0];
          }
        }
      }

      if (videoId) {
        videoContainerRef.current.innerHTML = `
          <iframe 
            width="100%" 
            height="100%" 
            src="https://www.youtube.com/embed/${videoId}" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
          </iframe>
        `;
        toast.success("Vídeo carregado com sucesso!");
      } else {
        toast.error("Link do YouTube inválido");
      }
    }
  };

  // Formatar a data atual
  const formattedDate = `${currentDateTime.getDate().toString().padStart(2, '0')}/${
    (currentDateTime.getMonth() + 1).toString().padStart(2, '0')}/${
    currentDateTime.getFullYear()} - ${
    currentDateTime.getHours().toString().padStart(2, '0')}:${
    currentDateTime.getMinutes().toString().padStart(2, '0')}`;

  // Formatar hora para o rodapé
  const formattedTime = `${currentDateTime.getHours().toString().padStart(2, '0')}:${
    currentDateTime.getMinutes().toString().padStart(2, '0')}:${
    currentDateTime.getSeconds().toString().padStart(2, '0')}`;

  // Calcular o total (soma de todos os grupos)
  const total = results.reduce((sum, item) => sum + item.group, 0);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <div className="flex-1"></div>
        <div className="flex-1 text-center">
          <h1 className="text-4xl font-bold text-yellow-500">Caipira JB</h1>
          <div className="bg-white text-black p-2 rounded mt-2 inline-block">
            <span className="font-bold">RESULTADO {formattedDate}</span>
          </div>
        </div>
        <div className="flex-1 flex justify-end">
          <Button 
            variant="outline" 
            onClick={handleLogout} 
            className="text-white border-white hover:bg-gray-800"
          >
            Sair
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left Column - Video Area */}
          <div className="space-y-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Cole o link ou embed do YouTube"
                value={youtubeLink}
                onChange={(e) => setYoutubeLink(e.target.value)}
                className="bg-gray-800 text-white border-gray-700"
              />
              <Button onClick={handleYoutubeEmbed} className="bg-green-600 hover:bg-green-700">
                Exibir
              </Button>
            </div>
            
            <div 
              ref={videoContainerRef} 
              className="bg-gray-800 aspect-video flex items-center justify-center text-gray-400 border border-gray-700"
            >
              Área do Vídeo
            </div>
          </div>
          
          {/* Right Column - Results Table */}
          <div className="space-y-4">
            <div className="bg-blue-800 p-2 text-center text-white text-xl font-bold">
              RESULTADOS
            </div>
            
            <div className="bg-gray-900 rounded overflow-hidden border border-gray-700">
              <Table>
                <TableHeader className="bg-gray-800">
                  <TableRow>
                    <TableHead className="text-center text-white">#</TableHead>
                    <TableHead className="text-center text-white">Milhar</TableHead>
                    <TableHead className="text-center text-white">Grupo</TableHead>
                    <TableHead className="text-center text-white">Animal</TableHead>
                    <TableHead className="text-center text-white">Foto</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((result) => (
                    <TableRow key={result.id} className="border-gray-700">
                      <TableCell className="text-center text-white">{result.id}</TableCell>
                      <TableCell className="text-center text-white">{result.number}</TableCell>
                      <TableCell className="text-center text-white">{result.group}</TableCell>
                      <TableCell className="text-center text-white">{result.animal}</TableCell>
                      <TableCell className="text-center">
                        <img 
                          src={result.image} 
                          alt={result.animal} 
                          className="h-10 w-10 object-cover inline-block"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-gray-800 border-gray-700">
                    <TableCell colSpan={2} className="text-left font-bold text-white">
                      SOMATÓRIO GERAL:
                    </TableCell>
                    <TableCell colSpan={3} className="text-right font-bold text-white">
                      {total}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {/* Number Input and Add Button */}
            <div className="flex space-x-2">
              <Input
                placeholder="Digite uma milhar (4 dígitos)"
                value={numberInput}
                onChange={(e) => setNumberInput(e.target.value)}
                maxLength={4}
                className="bg-gray-800 text-white border-gray-700"
              />
              <Button onClick={handleNumberSubmit} className="bg-green-600 hover:bg-green-700">
                Adicionar
              </Button>
            </div>
            
            <Button onClick={clearResults} className="w-full bg-red-600 hover:bg-red-700">
              Limpar Tabela
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 flex justify-between items-center border-t border-gray-800">
        <div>
          <span className="font-bold">HTTPS://CAIPIRAJB.COM</span>
        </div>
        <div className="bg-white text-black px-4 py-2 rounded border border-white">
          <span className="font-mono text-xl">{formattedTime}</span>
        </div>
      </footer>
    </div>
  );
};

export default Results;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Validate credentials
      if (username !== "admin" || password !== "12345") {
        toast({
          title: "Falha na autenticação",
          description: "Usuário ou senha inválidos.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      
      // Get public IP
      const ipResponse = await fetch("https://api64.ipify.org?format=json");
      const ipData = await ipResponse.json();
      const userIP = ipData.ip;
      
      // Check if IP is allowed
      const allowedIP = "177.204.33.224";
      // For development, also allow localhost access
      const isLocalhost = ["localhost", "127.0.0.1"].includes(window.location.hostname);
      
      if (userIP === allowedIP || isLocalhost) {
        // Save auth state in sessionStorage
        sessionStorage.setItem("isAuthenticated", "true");
        
        toast({
          title: "Sucesso!",
          description: "Login realizado com sucesso.",
        });
        
        // Navigate to results page
        navigate("/results");
      } else {
        toast({
          title: "Acesso negado",
          description: "Seu IP não está autorizado a acessar este sistema.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro na verificação",
        description: "Não foi possível verificar seu IP. Tente novamente mais tarde.",
        variant: "destructive",
      });
      console.error("IP verification error:", error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-lottery-background flex items-center justify-center p-4 bg-gradient-to-b from-lottery-primary/10 to-lottery-background">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold text-lottery-primary">
            Sorteio ao Vivo Federal
          </CardTitle>
          <CardDescription>
            Acesso restrito ao sistema de resultados
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                Usuário
              </label>
              <Input
                id="username"
                placeholder="Digite seu usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                className="border-lottery-secondary/30"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Senha
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="pr-10 border-lottery-secondary/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-lottery-primary"
                  aria-label={showPassword ? "Ocultar senha" : "Exibir senha"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full bg-lottery-primary hover:bg-lottery-primary/80"
              disabled={loading}
            >
              {loading ? "Autenticando..." : "Entrar"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;

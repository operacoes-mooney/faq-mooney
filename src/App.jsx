import React, { useState } from 'react';
import { 
  Search, ChevronDown, ChevronUp, BookOpen, Users, School, 
  AlertCircle, Menu, X, Mail, Book, Smartphone, PlayCircle, 
  Download, Award, Monitor, FileText, Image as ImageIcon
} from 'lucide-react';

// --- COMPONENTES AUXILIARES ---

// Componente para exibir imagens na FAQ de forma elegante
const FaqImage = ({ src, alt, caption }) => (
  <div className="my-6">
    <figure className="relative rounded-xl overflow-hidden border border-slate-200 shadow-md bg-slate-50 group">
      {/* A imagem tenta carregar. Se falhar (arquivo não existir), mostra um aviso visual */}
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-auto object-contain max-h-[400px] bg-white"
        onError={(e) => {
          e.target.onerror = null;
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'flex'; 
        }} 
      />
      {/* Fallback para quando a imagem não for encontrada */}
      <div className="hidden flex-col items-center justify-center p-8 text-slate-400 bg-slate-100 text-center min-h-[150px]">
        <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
        <p className="text-sm font-semibold text-slate-600">Imagem: {alt}</p>
        <span className="text-xs font-mono bg-slate-200 px-2 py-1 rounded mt-2 text-slate-500">{src}</span>
        <p className="text-xs mt-2 text-slate-400 max-w-xs mx-auto">
          (Salve a imagem do documento na pasta 'public' com este nome)
        </p>
      </div>
    </figure>
    {caption && <figcaption className="text-xs text-slate-500 mt-2 text-center italic">{caption}</figcaption>}
  </div>
);

const CategoryButton = ({ label, active, onClick, icon: Icon }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap
      ${active 
        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 scale-105' 
        : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'}`}
  >
    {Icon && <Icon className="w-4 h-4" />}
    {label}
  </button>
);

const AccordionItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className={`border rounded-lg bg-white overflow-hidden transition-all duration-300 mb-3 ${isOpen ? 'shadow-md border-indigo-100 ring-1 ring-indigo-50' : 'border-slate-200 hover:border-indigo-200'}`}>
      <button
        className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
        onClick={onClick}
      >
        <span className={`font-semibold pr-4 ${isOpen ? 'text-indigo-700' : 'text-slate-700'}`}>{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-indigo-500 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
        )}
      </button>
      <div
        className={`px-6 transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[3000px] opacity-100 pb-6' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="text-slate-600 leading-relaxed border-t border-slate-100 pt-4 text-base">
          {answer}
        </div>
      </div>
    </div>
  );
};

// --- DADOS COMPLETOS DA FAQ ---
const faqData = [
  // =================================================================================
  // ESTUDANTES
  // =================================================================================
  {
    id: 'student-1',
    category: 'Estudantes',
    question: 'Como fazer o login de um(a) estudante na Mooney?',
    answer: (
      <div className="space-y-4">
        <p>Para realizar o login, siga as instruções abaixo:</p>
        
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
          <h4 className="font-semibold text-indigo-600 mb-2 flex items-center gap-2">
            <Smartphone className="w-5 h-5" />
            Versão Aplicativo
          </h4>
          <div className="flex flex-wrap gap-3 mb-4">
            <a href="https://play.google.com/store/apps/details?id=br.com.mooney.missions&hl=pt_BR" target="_blank" rel="noreferrer" className="btn-store">
              Google Play
            </a>
            <a href="https://apps.apple.com/br/app/mooney/id1509285822" target="_blank" rel="noreferrer" className="btn-store">
              App Store
            </a>
          </div>
          <ol className="list-decimal pl-5 space-y-2 text-slate-700 text-sm">
            <li>Baixe ou atualize o App na loja.</li>
            <li>Selecione a opção <strong>"Aluno"</strong>.</li>
            <li>Insira o <strong>Voucher</strong> no campo indicado.</li>
            <li>Marque "Li e aceito a política de privacidade".</li>
          </ol>
        </div>

        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
          <h4 className="font-semibold text-indigo-600 mb-2 flex items-center gap-2">
            <Monitor className="w-5 h-5" />
            Versão Web
          </h4>
          <ol className="list-decimal pl-5 space-y-2 text-slate-700 text-sm">
            <li>Acesse <a href="https://jornada.mooneyapp.com.br" target="_blank" rel="noreferrer" className="text-blue-600 underline">jornada.mooneyapp.com.br</a>.</li>
            <li>Digite o Voucher no campo "Email ou Voucher".</li>
            <li>Marque os termos de uso e clique em "Fazer Login".</li>
          </ol>
        </div>
      </div>
    )
  },
  {
    id: 'student-2',
    category: 'Estudantes',
    question: 'Como fazer o cadastro e primeiro acesso?',
    answer: (
      <div className="space-y-4">
        <p>No aplicativo, selecione "Aluno", insira o Voucher, nome completo e data de nascimento.</p>
        
        <div className="flex items-center gap-3 bg-indigo-50 p-3 rounded-lg border border-indigo-100">
          <PlayCircle className="text-indigo-600 w-6 h-6" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-indigo-900">Tutorial em Vídeo</p>
            <p className="text-xs text-indigo-700">Assista ao passo a passo completo.</p>
          </div>
          <a href="https://www.youtube.com/watch?v=VfgEa0lV0Wc" target="_blank" rel="noreferrer" className="text-xs bg-indigo-600 text-white px-3 py-1.5 rounded hover:bg-indigo-700">Assistir</a>
        </div>
      </div>
    )
  },
  {
    id: 'student-3',
    category: 'Estudantes',
    question: 'Esqueci o voucher do(a) estudante. O que fazer?',
    answer: (
      <div className="space-y-4">
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 mb-4">
           <p className="text-amber-800 text-sm font-semibold">
             O Voucher é a identificação única do aluno (como um CPF dentro da Mooney). É composto por 6 números.
           </p>
        </div>

        <h4 className="font-bold text-slate-800">Situação 1: O estudante já tem o app instalado e logado</h4>
        <p className="text-sm">Se o estudante já está usando a plataforma, é muito fácil recuperar o número:</p>
        <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700">
          <li>Acesse o aplicativo da Mooney.</li>
          <li>No menu inferior, clique em <strong>"Perfil"</strong>.</li>
          <li>Em seguida, clique em <strong>"E-mail"</strong>.</li>
          <li>O voucher aparecerá na tela. <strong>Atenção:</strong> O voucher são apenas os <strong>6 primeiros números</strong> antes do símbolo @.</li>
        </ol>
        <FaqImage src="perfil-voucher-aluno.jpg" alt="Localização do Voucher no Perfil do Aluno" caption="Tela de perfil mostrando onde encontrar o voucher (números antes do @)." />

        <hr className="border-slate-200 my-4" />

        <h4 className="font-bold text-slate-800">Situação 2: O estudante não tem acesso ou perdeu o papel</h4>
        <p className="text-sm">Neste caso, será necessário solicitar o número novamente à escola:</p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
          <li>Procure o(a) <strong>Professor(a)</strong> responsável pela disciplina.</li>
          <li>Ou entre em contato com a <strong>Coordenação</strong> da escola.</li>
        </ul>
        <p className="text-sm mt-2">A escola possui acesso a uma lista completa com todos os vouchers ativos.</p>
      </div>
    )
  },
  {
    id: 'student-4',
    category: 'Estudantes',
    question: 'Posso comprar Mooners?',
    answer: "Infelizmente não é possível comprar Mooners. Eles são conquistados na plataforma."
  },
  {
    id: 'student-5',
    category: 'Estudantes',
    question: 'Como trocar Mooners com os amigos?',
    answer: "Selecione a opção 'Trocar' abaixo das 'Batalhas' na tela principal. Insira a chave de troca do seu amigo para adicioná-lo à lista, selecione o Mooner e confirme."
  },
  {
    id: 'student-6',
    category: 'Estudantes',
    question: 'Definições: Mooners, Jornada, Cofrinhos e Batalhas',
    answer: (
      <ul className="space-y-3">
        <li className="bg-slate-50 p-3 rounded"><strong>Mooners:</strong> Pets virtuais colecionáveis para evoluir e disputar.</li>
        <li className="bg-slate-50 p-3 rounded"><strong>Jornada:</strong> Conteúdos de educação financeira com quizzes e jogos.</li>
        <li className="bg-slate-50 p-3 rounded"><strong>Cofrinhos:</strong> Ferramenta para registrar objetivos financeiros.</li>
        <li className="bg-slate-50 p-3 rounded"><strong>Batalhas:</strong> Competições de perguntas e respostas contra colegas.</li>
      </ul>
    )
  },

  // =================================================================================
  // FAMÍLIA
  // =================================================================================
  {
    id: 'fam-1',
    category: 'Família',
    question: 'É possível acompanhar o andamento do meu filho?',
    answer: "Sim! Pela conta Família você acompanha o progresso, missões e uso da plataforma."
  },
  {
    id: 'fam-2',
    category: 'Família',
    question: 'Como criar uma conta família?',
    answer: (
      <div className="space-y-4">
        <p>Para realizar o cadastro da família, fazer o primeiro login e criar missões na plataforma da Mooney, por favor, siga as instruções abaixo, ou se preferir, veja o nosso vídeo explicativo com o tutorial completo de como utilizar o aplicativo.</p>
        
        <div className="flex items-center gap-3 bg-indigo-50 p-3 rounded-lg border border-indigo-100 mb-3">
          <PlayCircle className="text-indigo-600 w-6 h-6" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-indigo-900">Tutorial Completo para Famílias</p>
            <p className="text-xs text-indigo-700">Aprenda a cadastrar, conectar alunos e usar o app.</p>
          </div>
          <a href="https://www.youtube.com/watch?v=6WnoYAOdHD8" target="_blank" rel="noreferrer" className="text-xs bg-indigo-600 text-white px-3 py-1.5 rounded hover:bg-indigo-700">Assistir</a>
        </div>

        <ol className="list-decimal pl-5 space-y-1 text-slate-700">
          <li>No App, selecione <strong>"Família"</strong> e depois "Usar email" ou "Criar conta".</li>
          <li>Preencha seus dados (Nome, Data Nasc., Email, Senha).</li>
        </ol>
        
        <ol start="3" className="list-decimal pl-5 space-y-1 text-slate-700">
          <li>Após logar, clique em <strong>"Vincular outro aluno"</strong>.</li>
          <li>Insira o Voucher ou E-mail do estudante.</li>
        </ol>
      </div>
    )
  },
  {
    id: 'fam-3',
    category: 'Família',
    question: 'Como criar e validar missões?',
    answer: (
      <div className="space-y-3">
        <p>No painel inicial, clique em <strong>"Criar missões"</strong> e depois em <strong>"Nova missão"</strong>.</p>
        <p>Siga o passo a passo para definir o tipo de recompensa (financeira, pedagógica ou solidária) e o prazo.</p>
      </div>
    )
  },
  {
    id: 'fam-4',
    category: 'Família',
    question: 'Ranking da Mooney: Como o estudante participa?',
    answer: (
      <div>
        <p className="mb-2">Para informações detalhadas sobre como funciona o ranking e a participação dos estudantes:</p>
        <a href="https://drive.google.com/file/d/10ClHRXDH-2x4Dl6fPx-XNXUu4e7SlHDW/view?usp=sharing" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-indigo-600 font-semibold hover:underline">
          <FileText className="w-4 h-4" />
          Ver instruções sobre o Ranking
        </a>
      </div>
    )
  },

  // =================================================================================
  // GESTÃO ESCOLAR
  // =================================================================================
  {
    id: 'gest-1',
    category: 'Gestão',
    question: 'O aplicativo faz parte do pacote?',
    answer: "Sim. Todas as aulas contam com suporte de trilha gamificada e algumas usam o app como recurso pedagógico."
  },
  {
    id: 'gest-2',
    category: 'Gestão',
    question: 'A Mooney trabalha com livros?',
    answer: "Sim. Professores têm material digital e alunos acessam via app/web. Se a escola desejar, há livros físicos para Infantil, Anos Iniciais e Finais."
  },
  {
    id: 'gest-3',
    category: 'Gestão',
    question: 'Existe capacitação para professores? Como participar?',
    answer: (
      <div className="space-y-4">
        <p>Sim, existe um programa de capacitação continuada para os colégios parceiros. As formações são EAD na plataforma do professor.</p>
        <ol className="list-decimal pl-5 text-sm text-slate-700 space-y-1">
          <li>Acesse a plataforma com login de professor.</li>
          <li>Clique na aba <strong>"Formação"</strong>.</li>
          <li>Acesse as trilhas (planetas) e conquiste certificados.</li>
        </ol>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
          <a href="https://youtu.be/TDqYWPnAIIg" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-indigo-50 p-3 rounded-lg border border-indigo-100 hover:bg-indigo-100 transition">
            <PlayCircle className="text-indigo-600 w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-medium text-indigo-900">Tutorial de acesso EAD</span>
          </a>
          <a href="https://www.youtube.com/watch?v=LMXyHptK2Kc" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-indigo-50 p-3 rounded-lg border border-indigo-100 hover:bg-indigo-100 transition">
            <PlayCircle className="text-indigo-600 w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-medium text-indigo-900">Sobre a aba "Formação"</span>
          </a>
        </div>
      </div>
    )
  },
  {
    id: 'gest-4',
    category: 'Gestão',
    question: 'A Mooney faz eventos para responsáveis?',
    answer: "Sim, a Mooney promove eventos periódicos sobre educação financeira com diferentes temas e abordagens para responsáveis e funcionários."
  },
  {
    id: 'gest-5',
    category: 'Gestão',
    question: 'Quem aplica as aulas? São professores da Mooney?',
    answer: "Não. A Mooney capacita os professores do próprio colégio. O material é completo e simples para que qualquer professor consiga aplicar."
  },
  {
    id: 'gest-7',
    category: 'Gestão',
    question: 'Como preencher a planilha de cadastro?',
    answer: (
      <div className="space-y-3">
        <div className="flex items-center gap-3 bg-slate-100 p-3 rounded-lg">
          <PlayCircle className="text-slate-600 w-5 h-5" />
          <span className="text-sm text-slate-800">Veja o vídeo tutorial sobre preenchimento da planilha de cadastro:</span>
        </div>
        <a href="https://drive.google.com/file/d/1r8943gLBEZoMOXv59U_VfpuMgNgpGka8/view?usp=sharing" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:underline text-sm ml-2">
          <Monitor className="w-4 h-4" />
          Assistir Tutorial da Planilha
        </a>
      </div>
    )
  },
  {
    id: 'gest-8',
    category: 'Gestão',
    question: 'Financeiro: 2ª via, Pix e Múltiplos Boletos',
    answer: (
      <div className="space-y-3 text-sm">
        <div className="bg-green-50 p-3 rounded border border-green-100">
          <p><strong>2ª Via / Dúvidas:</strong> Envie e-mail para <a href="mailto:financeiro@mooneyapp.com.br" className="text-blue-600 underline">financeiro@mooneyapp.com.br</a> ou WhatsApp <strong>(11) 5192-2036</strong>.</p>
        </div>
        <div className="bg-green-50 p-3 rounded border border-green-100">
          <p><strong>Pix:</strong> Chave <span className="font-mono bg-white px-1 rounded">time-financeiro@mooneyapp.com.br</span>. Envie o comprovante para os contatos acima.</p>
        </div>
        <div className="bg-yellow-50 p-3 rounded border border-yellow-100">
          <p><strong>Recebi 2 boletos:</strong> Verifique a procedência. Se contratou "Mooney Baby" ou "Kids", pode receber boletos da editora "Dentro da História".</p>
        </div>
      </div>
    )
  },
  {
    id: 'gest-9',
    category: 'Gestão',
    question: 'Visualizando dados da direção (Painel)',
    answer: (
      <div className="space-y-2 text-sm">
        <p>Acesse <a href="https://diretor.mooneyapp.com.br/login" className="text-blue-600 underline">diretor.mooneyapp.com.br</a>.</p>
        <p><strong>Métricas disponíveis:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Ativou:</strong> Se o aluno acessou a plataforma.</li>
          <li><strong>Responsável Ativou:</strong> Se a família se cadastrou.</li>
          <li><strong>Aulas a liberar:</strong> Conteúdo ainda bloqueado.</li>
          <li><strong>Desempenho:</strong> Progresso nas jornadas.</li>
        </ul>
      </div>
    )
  },

  // =================================================================================
  // PROFESSORES
  // =================================================================================
  {
    id: 'prof-1',
    category: 'Professores',
    question: 'Como acessar a plataforma?',
    answer: "Acesse jornada.mooneyapp.com.br e faça login. Não é possível acessar sem cadastro. Para conseguir acesso, informe seu nome e e-mail ao representante da escola."
  },
  {
    id: 'prof-2',
    category: 'Professores',
    question: 'Gerenciando turmas: Desempenho, Bloqueio e Liberação',
    answer: (
      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-3 bg-indigo-50 p-3 rounded-lg border border-indigo-100 mb-2">
          <PlayCircle className="text-indigo-600 w-5 h-5 flex-shrink-0" />
          <div className="flex-1">
             <p className="font-medium text-indigo-900">Qual a função da aba "Alunos"?</p>
             <a href="https://www.youtube.com/watch?v=Xtm0ZxyZ5g8" target="_blank" rel="noreferrer" className="text-indigo-700 underline text-xs">Assistir vídeo explicativo</a>
          </div>
        </div>

        <p>Na aba <strong>"Alunos"</strong>:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Acompanhar:</strong> Clique no número da jornada para ver detalhes.</li>
          <li><strong>Liberar:</strong> Clique no ícone de cadeado.</li>
          <li><strong>Bloquear:</strong> Clique na fase liberada e selecione "bloquear fase".</li>
        </ul>
      </div>
    )
  },
  {
    id: 'prof-3',
    category: 'Professores',
    question: 'Função da aba "Aulas" e como concluir aula',
    answer: (
      <div className="space-y-2">
        <p>A aba serve para acessar o conteúdo. Para registrar o progresso, é vital clicar no botão <strong>"Concluir aula"</strong> ao final. Você pode fazer a avaliação rápida ou pular.</p>
      </div>
    )
  },
  {
    id: 'prof-4',
    category: 'Professores',
    question: 'Cadastrar, Alterar e Excluir Alunos',
    answer: (
      <div className="space-y-3 text-sm">
        <div className="bg-slate-50 p-2 rounded">
          <strong>Cadastrar:</strong> Aba "Alunos" &gt; Botão "Criar aluno" (canto superior).
        </div>
        <div className="bg-slate-50 p-2 rounded">
          <strong>Alterar/Excluir:</strong> Aba "Alunos" &gt; Menu (3 riscos) ao lado do aluno.
        </div>
      </div>
    )
  },
  {
    id: 'prof-5',
    category: 'Professores',
    question: 'Como encontrar o Voucher dos meus alunos?',
    answer: (
      <div className="space-y-4">
        <p>O(a) professor(a) pode visualizar o voucher de todos os alunos diretamente na plataforma. Isso é útil caso algum aluno esqueça ou perca o código.</p>
        
        <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700">
          <li>Acesse a plataforma do professor (jornada.mooneyapp.com.br).</li>
          <li>Clique na aba <strong>"Alunos"</strong> no menu superior.</li>
          <li>Selecione a turma desejada.</li>
          <li>A lista de alunos aparecerá. O <strong>Voucher</strong> está localizado logo abaixo do nome de cada estudante.</li>
        </ol>
        
        <FaqImage src="professor-lista-voucher.jpg" alt="Lista de Alunos com Voucher" caption="Visão da lista de alunos na plataforma do professor, destacando onde fica o voucher." />
        
        <div className="bg-indigo-50 border border-indigo-100 p-3 rounded-lg text-sm text-indigo-900 mt-4">
          <strong>Dica:</strong> Se o aluno perder o voucher, você pode consultar essa tela a qualquer momento e informar o número para ele.
        </div>
      </div>
    )
  },
  {
    id: 'prof-7',
    category: 'Professores',
    question: 'Personalização de Livros (Dentro da História)',
    answer: (
      <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
        <div className="flex items-center gap-2 mb-2">
          <Book className="w-5 h-5 text-red-500" />
          <span className="font-semibold text-slate-800">Tutorial Fundamental I</span>
        </div>
        <p className="text-sm text-slate-600 mb-2">Saiba como personalizar os livros na plataforma parceira.</p>
        <a href="https://drive.google.com/drive/folders/1_GPfCT3SESQt--AsfIOymentadzad5ry?usp=sharing" target="_blank" rel="noreferrer" className="text-xs flex items-center justify-center gap-1 bg-slate-800 text-white px-3 py-1.5 rounded hover:bg-slate-700 w-full sm:w-auto">
          <Download className="w-3 h-3" /> Acessar Tutorial PDF
        </a>
      </div>
    )
  },

  // =================================================================================
  // SUPORTE TÉCNICO
  // =================================================================================
  {
    id: 'sup-1',
    category: 'Suporte',
    question: 'Não consigo acessar a plataforma. O que fazer?',
    answer: (
      <ul className="list-disc pl-5 space-y-2 text-slate-700">
        <li><strong>Conexão:</strong> Teste 4G ou outro Wi-Fi.</li>
        <li><strong>Atualização:</strong> Verifique a loja de apps.</li>
        <li><strong>Reinstalação:</strong> Apague e instale o app novamente.</li>
        <li><strong>Navegador:</strong> Limpe o cache (Histórico &gt; Limpar dados de navegação &gt; Todo o período).</li>
      </ul>
    )
  },
  {
    id: 'sup-2',
    category: 'Suporte',
    question: 'Como limpar o cache do navegador?',
    answer: (
      <div className="space-y-4 text-sm">
        <div>
          <p className="font-semibold mb-1">Google Chrome:</p>
          <p>3 pontos &gt; Mais ferramentas &gt; Limpar dados. Marque "Imagens e arquivos em cache".</p>
        </div>
        <div>
          <p className="font-semibold mb-1">Microsoft Edge:</p>
          <p>3 pontos &gt; Histórico &gt; Lixeira &gt; Limpar agora.</p>
        </div>
      </div>
    )
  }
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [openId, setOpenId] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Categorias Fixas para Ordem Lógica
  const categories = [
    { id: 'Todos', icon: null },
    { id: 'Estudantes', icon: BookOpen },
    { id: 'Família', icon: Users },
    { id: 'Professores', icon: School },
    { id: 'Gestão', icon:  Award},
    { id: 'Suporte', icon: AlertCircle },
  ];

  const filteredData = faqData.filter((item) => {
    const matchesCategory = activeCategory === 'Todos' || item.category === activeCategory;
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (typeof item.answer === 'string' && item.answer.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleToggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* --- HEADER --- */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* LOGO */}
          <div className="flex items-center gap-2">
            <img 
              src="logo.jpg" 
              alt="Mooney Logo" 
              className="h-16 w-auto object-contain"
            />
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
            <a href="https://mooneyapp.com.br/" className="hover:text-indigo-600 transition-colors">Site Oficial</a>
            <a href="https://jornada.mooneyapp.com.br/" className="hover:text-indigo-600 transition-colors">Plataforma Web</a>
            <a href="#contact" className="hover:text-indigo-600 transition-colors">Contato</a>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 py-4 px-4 shadow-lg animate-in slide-in-from-top-5">
            <div className="flex flex-col gap-4 text-slate-600 font-medium">
              <a href="https://mooneyapp.com.br/" className="hover:text-indigo-600">Site Oficial</a>
              <a href="https://jornada.mooneyapp.com.br/" className="hover:text-indigo-600">Plataforma Web</a>
              <a href="#contact" className="hover:text-indigo-600">Contato</a>
            </div>
          </div>
        )}
      </header>

      {/* --- HERO SECTION --- */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Central de Ajuda Mooney</h1>
          <p className="text-indigo-100 text-lg md:text-xl font-light">
            Encontre respostas rápidas sobre a plataforma, pagamentos e metodologia.
          </p>
          
          <div className="relative max-w-xl mx-auto mt-8">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-indigo-300" />
            </div>
            <input
              type="text"
              className="block w-full pl-11 pr-4 py-4 rounded-full text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-400/30 shadow-lg text-lg"
              placeholder="Busque por voucher, login, boleto..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8">
        
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <CategoryButton 
              key={cat.id} 
              label={cat.id} 
              icon={cat.icon}
              active={activeCategory === cat.id} 
              onClick={() => { setActiveCategory(cat.id); setOpenId(null); }} 
            />
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <AccordionItem
                key={item.id}
                question={item.question}
                answer={item.answer}
                isOpen={openId === item.id}
                onClick={() => handleToggle(item.id)}
              />
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border border-dashed border-slate-300">
              <Search className="h-10 w-10 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-slate-900">Nenhum resultado encontrado</h3>
              <button 
                onClick={() => {setSearchQuery(''); setActiveCategory('Todos')}}
                className="mt-2 text-indigo-600 font-medium hover:underline text-sm"
              >
                Limpar filtros
              </button>
            </div>
          )}
        </div>
      </main>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="bg-white border-t border-slate-200 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Ainda precisa de ajuda?</h2>
          <p className="text-slate-600 mb-8">Nossa equipe está pronta para te atender.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <a href="mailto:encantamento@mooneyapp.com.br" className="flex items-center gap-4 p-6 bg-slate-50 rounded-xl hover:bg-slate-100 transition border border-slate-100 group text-left">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Email</h3>
                <p className="text-slate-500 text-sm break-all">encantamento@mooneyapp.com.br</p>
              </div>
            </a>

            <a href="https://wa.me/551151922036" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-6 bg-slate-50 rounded-xl hover:bg-slate-100 transition border border-slate-100 group text-left">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">WhatsApp</h3>
                <p className="text-slate-500 text-sm">(11) 5192-2036</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 text-slate-400 py-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-xl tracking-tight">MOONEY</span>
            <span className="text-xs bg-slate-800 px-2 py-0.5 rounded text-slate-300">EDU</span>
          </div>
          <p className="text-sm">© {new Date().getFullYear()} Mooney App. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* Custom Styles for App Store Buttons */}
      <style>{`
        .btn-store {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background-color: #0f172a;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          font-weight: 500;
          transition: background-color 0.2s;
        }
        .btn-store:hover {
          background-color: #334155;
        }
      `}</style>
    </div>
  );
}

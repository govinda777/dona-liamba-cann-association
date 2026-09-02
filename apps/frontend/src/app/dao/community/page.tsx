export const metadata = {
  title: 'Comunidade DAO | Dona Liamba',
  description: 'Hub da Comunidade Dona Liamba DAO.',
};

export default function DAOCommunityPage() {
  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Comunidade DAO
        </h1>
        <p className="text-lg text-gray-400">
          Bem-vindo ao espaço da nossa comunidade!
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 sm:p-8 space-y-6">
        <div className="prose prose-invert prose-emerald max-w-none">
          <p className="text-lg text-gray-300 leading-relaxed">
            Os participantes terão XP por participar da comunidade e fazer as missões diárias, esse XP pode ser trocado por produtos.
          </p>
        </div>

        <div className="bg-red-950/30 border border-red-900/50 rounded-lg p-4 mt-6">
          <h2 className="text-red-400 font-bold text-lg mb-2 flex items-center gap-2">
            Atenção
          </h2>
          <p className="text-red-200/80 text-sm">
            A política de produtos apenas pode ser feita caso o paciente tenha uma prescrição ativa e a anuidade em dia.
          </p>
        </div>
      </div>
    </div>
  );
}

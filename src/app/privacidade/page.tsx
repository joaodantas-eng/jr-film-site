import { siteConfig } from "@/data/site";
import { contactInfo } from "@/data/contact";
import { buildMetadata } from "@/config/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { buildWhatsAppLink } from "@/services/whatsapp";

export const metadata: Metadata = buildMetadata({
  title: "Política de Privacidade",
  description: `Como a ${siteConfig.name} trata os dados de quem usa o site, o assistente automotivo e os canais de contato, conforme a LGPD.`,
  path: "/privacidade",
});

// Texto escrito a partir do funcionamento REAL do site (outubro/2026).
// Pontos a revisar se o funcionamento mudar:
// - se a chave do Gemini está em projeto COM faturamento ativo (nível pago).
//   No nível gratuito, o Google pode usar o conteúdo para melhorar produtos
//   e revisores humanos podem lê-lo — nesse caso, o item correspondente
//   abaixo precisa ser ajustado;
// - se o Google Analytics (NEXT_PUBLIC_GA_MEASUREMENT_ID) será ativado;
// Recomenda-se revisão por profissional de direito antes da publicação.
const LAST_UPDATED = "15 de outubro de 2026";

export default function PrivacidadePage() {
  const whatsappLink = buildWhatsAppLink("Olá! Tenho uma solicitação sobre meus dados pessoais (LGPD).");

  return (
    <PageShell className="pb-20 pt-24 md:pt-32">
      <SectionContainer className="max-w-3xl">
        <Breadcrumb items={[{ label: "Política de Privacidade" }]} />
        <h1 className="type-display mt-6 text-display-lg text-foreground">Política de Privacidade</h1>
        <p className="mt-3 text-sm text-muted">Última atualização: {LAST_UPDATED}</p>

        <div className="prose-legal mt-8">
          <p>
            Esta política explica, de forma direta, quais dados são tratados quando você usa o site da{" "}
            {siteConfig.legalName}, para quê, com quem são compartilhados e como exercer seus direitos previstos na Lei
            Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD).
          </p>

          <h2>1. Quem é o responsável pelos dados</h2>
          <p>
            {siteConfig.legalName} ({siteConfig.name}), {contactInfo.address.full}. Contato: WhatsApp{" "}
            {contactInfo.whatsappDisplay} ou telefone {contactInfo.phoneDisplay}.
          </p>

          <h2>2. O que o site coleta e por quê</h2>

          <h3 id="assistente">Assistente automotivo (Diagnóstico Inteligente)</h3>
          <ul>
            <li>
              <strong>O que é tratado:</strong> o texto que você escreve, as fotos que você decidir anexar e o histórico
              recente da conversa (necessário para o assistente entender o contexto).
            </li>
            <li>
              <strong>Para quê:</strong> gerar uma orientação inicial sobre o problema do veículo.
            </li>
            <li>
              <strong>Com quem é compartilhado:</strong> as mensagens e fotos passam pelo nosso servidor (hospedado na
              Vercel) e são enviadas ao Google Gemini, serviço de inteligência artificial do Google, que gera a
              resposta. O Google trata esse conteúdo conforme os termos da API do Gemini, que preveem retenção por tempo
              limitado para prevenção de abuso.
            </li>
            <li>
              <strong>Armazenamento:</strong> a JR Film não grava suas conversas nem suas fotos em banco de dados. O
              texto da conversa fica salvo apenas no seu navegador (armazenamento da aba) para você não perder o
              histórico ao navegar pelo site, e é apagado quando a aba é fechada ou quando você clica em “Nova
              conversa”. Fotos ficam só na memória da página.
            </li>
            <li>
              <strong>Recomendação:</strong> não envie dados pessoais no chat, como documentos, placas, telefones ou
              endereços. As respostas são orientações iniciais e não substituem a avaliação presencial.
            </li>
          </ul>

          <h3>Proteção contra abuso</h3>
          <p>
            Antes de enviar a primeira mensagem ao assistente, uma verificação de segurança do Cloudflare Turnstile
            confirma que o acesso vem de uma pessoa. Para isso, a Cloudflare analisa dados técnicos do navegador e da
            conexão (como endereço IP e características do dispositivo), conforme a política de privacidade dela. Depois
            da verificação, o site guarda por 30 minutos um cookie técnico, estritamente necessário, que dispensa
            refazer a verificação a cada mensagem.
          </p>
          <p>
            Também para limitar o uso automatizado do assistente, o servidor guarda temporariamente um identificador
            embaralhado (hash) derivado do seu endereço IP, junto com a contagem de mensagens enviadas. Esse registro
            expira em até 24 horas, fica armazenado no serviço Upstash (banco de dados em memória usado só para essa
            contagem) e não é usado para nenhuma outra finalidade.
          </p>

          <h3>Registros técnicos de acesso</h3>
          <p>
            Como qualquer site, a hospedagem (Vercel) registra dados técnicos das requisições — como endereço IP,
            navegador e páginas acessadas — para segurança e funcionamento. Nossos registros de erro não incluem o
            conteúdo das conversas.
          </p>

          <h3 id="cookies">Estatísticas de uso e cookies</h3>
          <ul>
            <li>
              <strong>Vercel Web Analytics:</strong> mede visitas de forma agregada, sem cookies e sem identificar você
              individualmente.
            </li>
            <li>
              <strong>Google Analytics 4 (somente com o seu consentimento):</strong> quando ativado, um aviso pergunta
              se você aceita cookies de medição. Se você aceitar, o Google Analytics registra páginas visitadas e
              cliques em botões de contato (WhatsApp, telefone, rota), sem o conteúdo de conversas ou dados de contato.
              Se recusar, nada é carregado. Você pode mudar a escolha a qualquer momento em “Preferências de cookies”,
              no rodapé.
            </li>
            <li>
              <strong>Cookie de segurança do assistente:</strong> criado só depois da verificação Turnstile, expira em
              30 minutos e não é usado para medição ou publicidade.
            </li>
            <li>
              <strong>Armazenamento local:</strong> o navegador guarda sua escolha sobre cookies e, durante a sessão, a
              conversa com o assistente (veja acima).
            </li>
          </ul>

          <h3>Mapa e rota</h3>
          <p>
            O mapa do Google só é carregado se você clicar em “Carregar mapa aqui”. O botão de rota abre o Google Maps
            em outra aba. A partir daí, o tratamento segue a política de privacidade do Google.
          </p>

          <h3>WhatsApp e telefone</h3>
          <p>
            O site não possui formulários. Ao clicar em um botão de WhatsApp ou telefone, você sai do site e fala
            diretamente com a nossa equipe. As informações que você enviar por esses canais são usadas para atendimento
            e orçamento. O WhatsApp é operado pela Meta, conforme a política de privacidade dela.
          </p>

          <h3>Avaliações do Google</h3>
          <p>
            As avaliações exibidas no site são publicações públicas feitas por clientes no Google, mostradas com o nome
            como aparece lá.
          </p>

          <h2>3. Bases legais</h2>
          <ul>
            <li>Atendimento das suas solicitações e procedimentos antes de um orçamento (art. 7º, V, da LGPD);</li>
            <li>Legítimo interesse, para segurança do site e prevenção de abuso (art. 7º, IX);</li>
            <li>Consentimento, para cookies de medição do Google Analytics (art. 7º, I).</li>
          </ul>

          <h2>4. Transferência internacional</h2>
          <p>
            Os fornecedores citados (Vercel, Google, Cloudflare e Upstash) podem processar dados em servidores fora do
            Brasil, com as garantias previstas em seus próprios termos.
          </p>

          <h2>5. Seus direitos</h2>
          <p>
            Você pode pedir confirmação de tratamento, acesso, correção, anonimização, eliminação, informação sobre
            compartilhamento e revogação de consentimento (art. 18 da LGPD). Como não guardamos as conversas do
            assistente, para apagá-las basta fechar a aba ou iniciar uma nova conversa. Para outras solicitações, fale
            conosco pelo{" "}
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>{" "}
            ou pelo telefone <a href={`tel:${contactInfo.phoneRaw}`}>{contactInfo.phoneDisplay}</a>. Você também pode
            reclamar à Autoridade Nacional de Proteção de Dados (ANPD).
          </p>

          <h2>6. Alterações</h2>
          <p>
            Esta política pode ser atualizada quando o funcionamento do site mudar. A data no topo indica a versão
            vigente. Dúvidas? Volte para a <Link href="/">página inicial</Link> ou fale com a nossa equipe.
          </p>
        </div>
      </SectionContainer>
    </PageShell>
  );
}

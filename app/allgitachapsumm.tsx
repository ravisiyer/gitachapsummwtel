import { gql } from "@apollo/client";
import createApolloClient from "@/apolloClient";
import { gitaChaptersTelugu } from "@/app/lib/telugudata";

// Ref: https://www.apollographql.com/blog/next-js-getting-started
export async function getAllChapters() {
  const client = createApolloClient();
  const { data } = await client.query({
    query: gql`
      query {
        allGitaChapters {
          nodes {
            id
            chapterNumber
            chapterSummary
            chapterSummaryHindi
            name
            nameTranslated
            versesCount
          }
        }
      }
    `,
  });

  return {
    allGitaChapters: data.allGitaChapters.nodes,
  };
}

async function AllGitaChaptersSummaries() {
  let data = await getAllChapters();
  let allGitaChapters = data.allGitaChapters;
  let allGitaChapterswTel = allGitaChapters.map(
    (
      chapter: {
        id: number;
        chapterNumber: number;
        name: string;
        nameTranslated: string;
        chapterSummary: string;
        chapterSummaryHindi: string;
        versesCount: number;
      },
      index: number
    ) => {
      return {
        ...chapter,
        nameTelugu: gitaChaptersTelugu[index].nameTelugu,
        chapterSummaryTelugu: gitaChaptersTelugu[index].chapterSummaryTelugu,
      };
    }
  );

  return (
    <div>
      <h2>
        Bhagavad Gita Chapter Summaries भगवत गीता अध्यायों का सारांश భగవద్గీత
        తెలుగు అధ్యాయం సారాంశాలు
      </h2>
      <p>
        Starter/test app. version without styling.
        <br />
        Data source 1: English and Hindi summaries data fetched from
        https://gql.bhagavadgita.io/graphql using Apollo Client.
        <br />
        Data Source 2: Telugu summaries data manually created from{" "}
        <a href="https://archive.org/details/geeta-telugu-with-word2word-meaning-and-translation/Front%20Pages/page/n9/mode/2up">
          Bhagavad Gita - Telugu - Word-to-Word meaning and translation PDF -
          Swami Nirvikalpananda
        </a>{" "}
        public domain book on archive.org.
      </p>
      {allGitaChapterswTel.map(
        (chapter: {
          id: number;
          chapterNumber: number;
          name: string;
          nameTranslated: string;
          nameTelugu: string;
          chapterSummary: string;
          chapterSummaryHindi: string;
          chapterSummaryTelugu: string;
          versesCount: number;
        }) => (
          <div key={chapter.id}>
            <h3>{`${chapter.chapterNumber}: ${chapter.nameTranslated} ${chapter.name} ${chapter.nameTelugu}`}</h3>
            <h4>English Summary</h4>
            <p>{chapter.chapterSummary}</p>
            <h4>हिन्दी सारांश</h4>
            <p>{chapter.chapterSummaryHindi}</p>
            <h4>తెలుగు సారాంశం</h4>
            <p>{chapter.chapterSummaryTelugu}</p>
            <p>{`${chapter.versesCount} verses`}</p>
          </div>
        )
      )}
    </div>
  );
}
export default AllGitaChaptersSummaries;

import OpenAI from "openai";
import { Octokit } from "@octokit/rest";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

export async function summarizeIssue(issue) {
  const response = await openai.responses.create({
    model: "gpt-5",
    input: `Summarize this GitHub issue clearly and briefly:

Title: ${issue.title}

Body:
${issue.body || "(no description)"}`
  });

  return response.output_text;
}

export async function getIssue(owner, repo, issueNumber) {
  const result = await octokit.issues.get({
    owner,
    repo,
    issue_number: issueNumber
  });

  return result.data;
}

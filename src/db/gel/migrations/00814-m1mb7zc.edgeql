CREATE MIGRATION m1mb7zc4flran4nzjjltjk6hkafjt6f5nnvf2z64x33l3m2jukoa5q
    ONTO m16ngikqxjzuifqqhi7ty2tmwlzn7udornqevpzsmafm5o4iojtbfq
{
          ALTER TYPE app_cm::CmClient {
      ALTER LINK codeHighestEd {
          RENAME TO codeHighestEducation;
      };
  };
};

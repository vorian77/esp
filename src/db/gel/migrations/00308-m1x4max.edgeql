CREATE MIGRATION m1x4max2mc5222df6denv7q2osrvnyis3nbl2vieq2uh4myntp44fa
    ONTO m12jfwskmonyhiqlvlp2tk7rojyvutsde6qvzav5mybkg7kcvzjqha
{
                  ALTER TYPE default::SysPerson {
      CREATE PROPERTY idMigration: std::uuid;
  };
};

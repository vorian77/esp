CREATE MIGRATION m1q5zgmx66jime2n5hplvjdxa5cdgvr2sbge55qactsaawevak5nuq
    ONTO m1b45wjazgjeexaklr3hoth4tj2tj7nkssblinntrsokqs2piycsba
{
                  ALTER TYPE app_cm::CmCohort {
      ALTER LINK attdsCohort {
          RENAME TO attdsCohorts;
      };
  };
  ALTER TYPE app_cm::CmCohort {
      ALTER LINK csfCohorts {
          ON TARGET DELETE ALLOW;
      };
  };
};

CREATE MIGRATION m12ea4hysn7zld6nx3gwtlmumk2fohdinyxqgfdtu6yonz3rl6gewq
    ONTO m12kk45ut2fkqtwczahxwmdo733g7jpie2ebbt2nj6e3fs7bn6r3sa
{
  ALTER TYPE app_cm::CmCourse {
      ALTER LINK cohorts {
          ON TARGET DELETE ALLOW;
      };
  };
};

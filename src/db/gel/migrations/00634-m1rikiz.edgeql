CREATE MIGRATION m1rikizasiunutyihj2puxhkzfvwqq6dzkebhs7uljnb7avq7zg57a
    ONTO m1o266frw2vh765r4iq42jgqje5o6nyjsei7j7ss4a5upihvsldzzq
{
              ALTER TYPE app_cm::CmClient {
      DROP LINK ownerOld;
  };
};

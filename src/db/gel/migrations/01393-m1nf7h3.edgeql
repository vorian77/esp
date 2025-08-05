CREATE MIGRATION m1nf7h3rniqvupl5tovwecfzligpbxkpl3xdy6yz666cgcf2kqtpkq
    ONTO m1xded2gwioeerguqcuuafchij3hurlcehggifp2siip454ucdegva
{
  ALTER TYPE app_cm::CmCsfEligibility {
      DROP LINK cmProgram;
  };
};

CREATE MIGRATION m1hfzpbekjsnhuanjyer25k6qxqctm24xbp3ouxgpllshdcph26koq
    ONTO m1t5gashigyx7bt2jp6kd4jh5tr4hlofyeqi3wqfko326l5qybjgtq
{
  ALTER TYPE app_cm::CmCsfDocument {
      CREATE PROPERTY isVerifiedByCaseManager: std::bool;
      CREATE PROPERTY isVerifiedByCompliance: std::bool;
  };
};

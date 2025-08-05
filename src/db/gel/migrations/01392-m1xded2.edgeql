CREATE MIGRATION m1xded2gwioeerguqcuuafchij3hurlcehggifp2siip454ucdegva
    ONTO m1lipik2tf25bc3dj3ya3qgbats6tcekj3d3kc7cz74npdnvfpttyq
{
  ALTER TYPE app_cm::CmCsfEligibility {
      ALTER PROPERTY nodeValues {
          RENAME TO eligibilityData;
      };
  };
};

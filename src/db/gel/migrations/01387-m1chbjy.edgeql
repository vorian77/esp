CREATE MIGRATION m1chbjyi5ps4ssvca7brwz5k23fbxzqwtbrp3n34r3msib5cvwyw7a
    ONTO m1uxqc35x7ugsqdo24cnaccsbd6bozxha6gicrvbaaf6ygroizqotq
{
  ALTER TYPE app_cm::CmCsfEligibility {
      ALTER LINK program {
          RENAME TO cmProgram;
      };
  };
};

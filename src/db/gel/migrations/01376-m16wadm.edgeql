CREATE MIGRATION m16wadmhxv2cxrdhlrkhkhlg3yxuos2wqvsiypic7crfyksa7h5noa
    ONTO m1lvk4aizrw2b4sqlij2dgehemhxwl5hdo4s4pv2dudb6o6fkm4yla
{
  ALTER TYPE app_cm::CmCsfEligibility {
      ALTER PROPERTY fieldEmbedDetailEligibility {
          RENAME TO nodeValues;
      };
  };
};

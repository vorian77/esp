CREATE MIGRATION m1o2toe6mmewd4hpmsaaffmskaxkedghbc7tckkwazdq32hxuq37pq
    ONTO m1ojmrnnt4pewsaz6t4scbdnwi7rvc4hotjtsn5fdazhl3zjmv2lma
{
  ALTER TYPE app_cm::CmCsfJobPlacement {
      DROP PROPERTY dateSubmitted;
  };
};

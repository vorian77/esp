CREATE MIGRATION m1kj7sj5k2kite7hmrli7ybais5nk7iosnihi57hkvop75f4y5cyka
    ONTO m1a5trvcn6t475h7i7f2arevaqzuxifx6cjh2d5wwwsaxtqdpg5zea
{
  ALTER TYPE app_cm::CmClientServiceFlow {
      DROP PROPERTY noteOld;
  };
};

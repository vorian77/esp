CREATE MIGRATION m1xk7ihezaj5crk4c47p6qkacfksjk5eo56wssdyoyjdk3fo4nmc2a
    ONTO m1fbyxbsa5uw2w4exwf7b7prni23btggjoqc35blucbhuda7grc33a
{
  ALTER TYPE app_cm::CmClientServiceFlow {
      ALTER LINK objAttrCmProgram {
          SET REQUIRED USING (<app_cm::CmProgram>{});
      };
      ALTER LINK objAttrCmSite {
          SET REQUIRED USING (<app_cm::CmSite>{});
      };
  };
};

CREATE MIGRATION m1wl2eevtnyuawacvjof55ixdjrtjbsuzlhunh4odu3rrwajrhjboa
    ONTO m1urnnxjisew4nx2qplfoerztfoshpqr76wcin33lqtkl4mdae4z4a
{
              ALTER TYPE org_moed::MoedParticipant {
      ALTER LINK office {
          SET TYPE sys_core::SysObjSubject USING (.office[IS sys_core::SysObjSubject]);
      };
  };
};

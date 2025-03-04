CREATE MIGRATION m1csep4spholqdwqrpaiplh6k4q4hw5plfjbedbazw4ynqv4ednwva
    ONTO m1kd2uys53odkpo2wxc5mahnp5zt7kmvqphba5np5pugggjweo2iyq
{
                              ALTER TYPE sys_core::SysDataObjColumn {
      DROP PROPERTY isDbFilter;
  };
};

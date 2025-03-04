CREATE MIGRATION m1k7gbeib4z55mnrd6jokj6s27kcwf4ykyffe44mtklhtzacuyyq4q
    ONTO m1juiiukx2b42cq2ee4tabkzoaezzb724dnsg2a7zm37r4x5dsejwa
{
          ALTER TYPE sys_user::SysTask {
      DROP PROPERTY orderDefined;
  };
};

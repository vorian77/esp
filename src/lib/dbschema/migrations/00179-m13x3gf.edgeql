CREATE MIGRATION m13x3gffoxuhpmbxpoex7yalaxzhbqpr27eg7ses67xqucbbad62ca
    ONTO m1td4zttnx6tf54h72enlbmnuq7q2ctnpn36b5qp3m4ub54tgwnizq
{
  ALTER TYPE sys_core::SysDataObjAction {
      ALTER PROPERTY confirmBeforeChanged {
          RENAME TO confirmBeforeChange;
      };
  };
};

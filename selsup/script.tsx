import React, { useState, useEffect } from 'react';

interface Param {
  id: number;
  name: string;
  type: 'string';
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
}

interface Props {
  params: Param[];
  model: Model;
}

const ParamEditor: React.FC<Props> = ({ params, model }) => {
  const [paramValues, setParamValues] = useState<ParamValue[]>(model.paramValues);

  useEffect(() => {
    setParamValues(model.paramValues);
  }, [model]);

  const handleParamChange = (paramId: number, value: string) => {
    const updatedValues = paramValues.map((paramValue) =>
      paramValue.paramId === paramId ? { ...paramValue, value } : paramValue
    );
    setParamValues(updatedValues);
  };

  const getModel = (): Model => {
    return { paramValues };
  };

  return (
    <div>
      {params.map((param) => {
        const paramValue = paramValues.find((pv) => pv.paramId === param.id)?.value || '';
        return (
          <div key={param.id} style={{ marginBottom: '10px' }}>
            <label>{param.name}</label>
            <input
              type="text"
              value={paramValue}
              onChange={(e) => handleParamChange(param.id, e.target.value)}
            />
          </div>
        );
      })}
      <button onClick={() => console.log(getModel())}>Получить модель</button>
    </div>
  );
};

const App: React.FC = () => {
  const params: Param[] = [
    { id: 1, name: 'Назначение', type: 'string' },
    { id: 2, name: 'Длина', type: 'string' },
  ];

  const model: Model = {
    paramValues: [
      { paramId: 1, value: 'повседневное' },
      { paramId: 2, value: 'макси' },
    ],
  };

  return <ParamEditor params={params} model={model} />;
};

export default App;

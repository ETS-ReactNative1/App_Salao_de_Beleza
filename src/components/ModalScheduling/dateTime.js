import React, { useState, useEffect } from "react";
import { FlatList } from "react-native-gesture-handler";
import { Touchable, Text, Title, Box } from "../../styles";
import util from "../../util";
import theme from "../../styles/theme.json";

const DateTime = () => {
  const [selectDate, setSelectDate] = useState();
  const [selectTime, setSelectTime] = useState();
  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedHour, setSelectedHour] = useState(null);
  const [listDays, setListDays] = useState([]);
  const [listHours, setListHours] = useState([]);

  useEffect(() => {
    const today = new Date();
    setSelectedYear(today.getFullYear());
    setSelectedMonth(today.getMonth());
    setSelectedDay(today.getDate());
  }, []);

  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

  useEffect(() => {
    let daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    console.log('daysInMonth    '+daysInMonth)
    let newListDays = [];
    for (let i = 1; i <= daysInMonth; i++) 
    {
      console.log(i)
      let d = new Date(selectedYear,' ---', selectedMonth, ' ----', i);
      console.log(d)
      let year = d.getFullYear();
      let month = d.getMonth() + 1;
      let day = d.getDate();
      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;
      // let selDate = `${year}-${month}-${day}`;
      // let aviability = user.available.filter((e) => e.date === selDate);
      // console.log('aviability   ', aviability  )
      newListDays.push({
        // status: aviability.length > 0 ? true : false,
        weekday: days[d.getDay()],
        number: i,
        month: months[d.getMonth()],
      });
    }
    setListDays(newListDays);
    setSelectedDay(0);
    setListHours([]);
    setSelectedHour(0);
  }, [selectedMonth, selectedYear]);

  const selectButtom = (item) => {
    setSelectDate(item);
  };

  const selectButtomTime = (item) => {
    setSelectTime(item);
  };

  return (
    <>
      <Text bold color="dark" hasPadding>
        Pra quando você deseja agendar
      </Text>
      <FlatList
        data={listDays}
        horizontal
        showsHorizontalScrollIndicator={false} // Tirar a barra de rolagem
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{
          paddingLeft: 20,
          marginRight: 20,
        }}
        renderItem={({ item, index }) => (
          <Touchable
            key={index}
            width="70px"
            height="80px"
            spacing="0 10px 0 0"
            rounded="10px"
            direction="column"
            justify="center"
            align="center"
            border={`1px solid ${
              item === selectDate
                ? theme.colors.primary
                : util.toAlpha(theme.colors.muted, 20)
            }`}
            background={
              item === selectDate ? theme.colors.primary : theme.colors.light
            }
            onPress={() => selectButtom(item)}
          >
            <Box
              direction="column"
              align="center"
              spacing="10px 0 0 0"
              justify="space-around"
            >
              <Text
                small
                color={item === selectDate ? theme.colors.light : undefined}
              >
                {item.weekday}
              </Text>
              <Title
                small
                color={item === selectDate ? theme.colors.light : undefined}
              >
                {item.number}
              </Title>
              <Text
                small
                color={item === selectDate ? theme.colors.light : undefined}
              >
                {item.month}
              </Text>
            </Box>
          </Touchable>
        )}
      />
      <Text bold color="dark" hasPadding>
        Que horas?
      </Text>
      <FlatList
        data={[
          ["14:30", "15:00"],
          ["15:30", "16:00"],
          ["16:30", "17:00"],
          ["17:30"],
        ]}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingLeft: 20,
        }}
        renderItem={({ item }) => (
          <Box direction="column" spacing="0 10px 0 0">
            {item.map((time) => (
              <Touchable
                key={time}
                width="100px"
                height="35px"
                spacing="0 0 5px 0"
                rounded="7px"
                justify="center"
                align="center"
                border={`1px solid ${
                  time === "14:30"
                    ? theme.colors.primary
                    : util.toAlpha(theme.colors.muted, 20)
                }`}
                background={
                  time === "14:30"
                    ? theme.colors.primary
                    : util.toAlpha(theme.colors.muted, 20)
                }
                onPress={() => selectButtomTime(item)}
              >
                <Text color={time === "14:30" ? "light" : undefined}>
                  {time}
                </Text>
              </Touchable>
            ))}
          </Box>
        )}
      />
    </>
  );
};

export default DateTime;

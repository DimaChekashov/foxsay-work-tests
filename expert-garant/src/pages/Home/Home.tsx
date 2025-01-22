import { Box, Container, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useState } from 'react';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from '@mui/x-date-pickers';

const mockData = [
  { id: 1, username: "Алексей Иванов", status: "Активен", role: "Администратор", salary: "150,000₽", workFormat: "Офис", createdAt: "2025-01-01" },
  { id: 2, username: "Мария Смирнова", status: "Неактивен", role: "Менеджер", salary: "120,000₽", workFormat: "Удалёнка", createdAt: "2025-12-20" },
  { id: 3, username: "Иван Кузнецов", status: "Активен", role: "Пользователь", salary: "90,000₽", workFormat: "Гибрид", createdAt: "2025-11-30" },
  { id: 4, username: "Екатерина Соколова", status: "Заблокирован", role: "Администратор", salary: "140,000₽", workFormat: "Офис", createdAt: "2025-12-10" },
  { id: 5, username: "Дмитрий Попов", status: "Активен", role: "Пользователь", salary: "80,000₽", workFormat: "Удалёнка", createdAt: "2025-10-05" },
  { id: 6, username: "Анна Лебедева", status: "Активен", role: "Менеджер", salary: "110,000₽", workFormat: "Гибрид", createdAt: "2025-09-12" },
  { id: 7, username: "Сергей Новиков", status: "Неактивен", role: "Пользователь", salary: "85,000₽", workFormat: "Удалёнка", createdAt: "2025-08-30" },
  { id: 8, username: "Ольга Козлова", status: "Активен", role: "Менеджер", salary: "105,000₽", workFormat: "Офис", createdAt: "2025-07-15" },
  { id: 9, username: "Николай Васильев", status: "Заблокирован", role: "Пользователь", salary: "70,000₽", workFormat: "Удалёнка", createdAt: "2025-06-05" },
  { id: 10, username: "Татьяна Орлова", status: "Активен", role: "Администратор", salary: "160,000₽", workFormat: "Офис", createdAt: "2025-05-01" },
  { id: 11, username: "Владимир Фёдоров", status: "Неактивен", role: "Менеджер", salary: "115,000₽", workFormat: "Гибрид", createdAt: "2025-04-10" },
  { id: 12, username: "Елена Морозова", status: "Активен", role: "Пользователь", salary: "75,000₽", workFormat: "Удалёнка", createdAt: "2025-03-20" },
  { id: 13, username: "Михаил Захаров", status: "Заблокирован", role: "Менеджер", salary: "95,000₽", workFormat: "Офис", createdAt: "2025-02-14" },
  { id: 14, username: "Светлана Петрова", status: "Активен", role: "Администратор", salary: "145,000₽", workFormat: "Гибрид", createdAt: "2025-01-30" },
  { id: 15, username: "Артём Васильев", status: "Неактивен", role: "Пользователь", salary: "80,000₽", workFormat: "Удалёнка", createdAt: "2025-01-15" },
];

function Home() {
  const [filters, setFilters] = useState({
    status: "",
    role: "",
    workFormat: "",
  });
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const handleFilterChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Отфильтрованные данные
  const filteredData = mockData.filter((item) => {
    const itemDate = dayjs(item.createdAt);

    const matchesStatus = filters.status ? item.status === filters.status : true;
    const matchesRole = filters.role ? item.role === filters.role : true;
    const matchesWorkFormat = filters.workFormat ? item.workFormat === filters.workFormat : true;
    const matchesStartDate = startDate ? itemDate.isAfter(startDate.subtract(1, "day")) : true;
    const matchesEndDate = endDate ? itemDate.isBefore(endDate.add(1, "day")) : true;

    return matchesStatus && matchesRole && matchesWorkFormat && matchesStartDate && matchesEndDate;
  });


  return (
    <Container
      sx={{
        paddingTop: 4,
      }}
    >
      <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="status-select-label">Статус</InputLabel>
          <Select
            labelId="status-select-label"
            id="status-select"
            value={filters.status}
            label="Статус"
            onChange={handleFilterChange}
            name="status"
          >
            <MenuItem value="">Все</MenuItem>
            <MenuItem value="Активен">Активен</MenuItem>
            <MenuItem value="Неактивен">Неактивен</MenuItem>
            <MenuItem value="Заблокирован">Заблокирован</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="role-select-label">Роль</InputLabel>
          <Select
            labelId="role-select-label"
            id="role-select"
            value={filters.role}
            label="Статус"
            onChange={handleFilterChange}
            name="role"
          >
            <MenuItem value="">Все</MenuItem>
            <MenuItem value="Администратор">Администратор</MenuItem>
            <MenuItem value="Менеджер">Менеджер</MenuItem>
            <MenuItem value="Пользователь">Пользователь</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="work-format-select-label">Формат работы</InputLabel>
          <Select
            labelId="work-format-select-label"
            id="work-format-select"
            value={filters.workFormat}
            label="Статус"
            onChange={handleFilterChange}
            name="workFormat"
          >
            <MenuItem value="">Все</MenuItem>
            <MenuItem value="Офис">Офис</MenuItem>
            <MenuItem value="Удалёнка">Удалёнка</MenuItem>
            <MenuItem value="Гибрид">Гибрид</MenuItem>
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Начальная дата"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
          />
          <DatePicker
            label="Конечная дата"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
          />
        </LocalizationProvider>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Имя</TableCell>
              <TableCell align="right">Статус</TableCell>
              <TableCell align="right">Роль</TableCell>
              <TableCell align="right">Зарплата</TableCell>
              <TableCell align="right">Формат работы</TableCell>
              <TableCell align="right">Дата создания</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length > 0 ? ( 
              filteredData.map(({ id, username, status, role, salary, workFormat, createdAt }) => (
                <TableRow
                  key={id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {username}
                  </TableCell>
                  <TableCell align="right">{role}</TableCell>
                  <TableCell align="right">{status}</TableCell>
                  <TableCell align="right">{salary}</TableCell>
                  <TableCell align="right">{workFormat}</TableCell>
                  <TableCell align="right">{createdAt}</TableCell>
                </TableRow>
              ))) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Нет данных
                  </TableCell>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Home;

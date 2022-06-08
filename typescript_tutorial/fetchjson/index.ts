import axios from "axios";

const url = "https://jsonplaceholder.typicode.com/posts/1/";

interface Data {
  id: number;
  title: string;
  completed: boolean;
}

axios.get(url).then((res) => {
  const data = res.data as Data;
  const Id = data.id;
  const title = data.title;

  logData(Id, title);
});

const logData = (id: number, title:string) => {
  console.log(`${id}: ${title}`);
};

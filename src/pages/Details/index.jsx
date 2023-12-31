import { useState, useEffect } from "react";
import {Container, Links, Content} from "./styles";
import { Section } from "../../components/section";
import  Header  from "../../components/Header";
import { Button } from "../../components/Button";
import { ButtonText } from "../../components/Button Text";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../services/api";

import { Tag } from "../../components/Tag";


export function Details() {
  const [data, setData] = useState(null)
  const params = useParams();

  const navigate = useNavigate();

  function handleBack () {
    navigate(-1)
  }

 async function handleRemove() {
    const confirm = window.confirm("Deseja realmente remover a nota?")

    if(confirm) {
      await api.delete(`/notes/${params.id}`)
      navigate(-1)
    }
  }

  useEffect(() => {
    async function fetchNotes(params) {
      const response = await api.get(`/notes/${params.id}`);
      setData(response.data)
    }

    fetchNotes();

  }, [])

  return (
    <Container>
      <Header/>

      {

        data && 
        <main>
        <Content>

    <ButtonText 
    title= "Exluir a nota"
    onClick = {() => handleRemove()}
    />

    <h1>{data.title}</h1>
    <p>
      {data.description}
    </p>

{data.links && 
      <Section title="Links úteis">

      <Links>
           { 
           data.links.map(link => (
           <li key={String(link.id)}>
            <a href={link.url} 
            rel="noreferrer"
            target ="_blank" >
              {link.url}
            </a>
          </li>
          ))
          }
        </Links>
      </Section>
}

      {data.tags &&
        <Section title="Marcadores">
      {
        data.tags.map( tag => (
        <Tag 
        key={String(tag.id)}
        title= {tag.name}/>
        ))

      }

      </Section>
      }

      <Button 
      title= 'Voltar' 
      loading = {false}
      onClick = {() => handleBack()} />
        </Content>
      </main>

      }
    </Container>   

  )
}
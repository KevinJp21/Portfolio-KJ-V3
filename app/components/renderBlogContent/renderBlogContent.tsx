import { JSX } from "react";
export default function RenderBlogContent({ content }: { content: any[] }) {
  const elements = [];
  let currentList: any[] = [];
  let currentListFormat: string | null = null;

  for (let i = 0; i < content.length; i++) {
    const block = content[i];
    // Renderizar la imagen si la hay
    if (block.image) {
      const imageUrl = block.image.formats.large?.url || block.image.url; // Asegurarse de usar 'large' si está disponible
      elements.push(
        <img
          key={`image-${i}`}
          src={process.env.STRAPI_API_URL + imageUrl}
          alt={block.image.alternativeText || "Image"}
          width={block.image.formats.large?.width || 1000} // Usar el tamaño 'large' si está disponible
          height={block.image.formats.large?.height || 518} // Usar la altura del formato 'large'
        />
      );
    }
    if (block.type === "list") {
      if (currentListFormat === block.format || currentList.length === 0) {
        currentList.push(...block.children);
        currentListFormat = block.format;
      } else {
        // Cambió el formato, renderizar lista anterior y comenzar nueva
        const ListTag = currentListFormat === "unordered" ? "ul" : "ol";
        elements.push(
          <ListTag key={`list-${i}`}>
            {currentList.map((item, idx) => (
              <li key={idx}>
                {item.children.map((child: any, j: number) =>
                  child.bold ? (
                    <strong key={j}>{child.text}</strong>
                  ) : (
                    <span key={j}>{child.text}</span>
                  )
                )}
              </li>
            ))}
          </ListTag>
        );
        // Iniciar nueva lista
        currentList = [...block.children];
        currentListFormat = block.format;
      }
    } else {
      // Si venía una lista acumulada, renderizarla primero
      if (currentList.length > 0) {
        const ListTag = currentListFormat === "unordered" ? "ul" : "ol";
        elements.push(
          <ListTag key={`list-${i}`}>
            {currentList.map((item, idx) => (
              <li key={idx}>
                {item.children.map((child: any, j: number) =>
                  child.bold ? (
                    <strong key={j}>{child.text}</strong>
                  ) : (
                    <span key={j}>{child.text}</span>
                  )
                )}
              </li>
            ))}
          </ListTag>
        );
        currentList = [];
        currentListFormat = null;
      }

      switch (block.type) {
        case "paragraph":
          // Verifica si el párrafo solo contiene un enlace
          const onlyLink =
            block.children.length === 3 &&
            block.children[1]?.type === "link" &&
            block.children.filter((c: any) => c.type === "link").length === 1;

          if (onlyLink) {
            const link = block.children[1];
            elements.push(
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.children.map((child: any, j: number) =>
                  child.bold ? (
                    <strong key={j}>{child.text}</strong>
                  ) : (
                    <span key={j}>{child.text}</span>
                  )
                )}
              </a>
            );
          } else {
            elements.push(
              <p key={i}>
                {block.children.map((child: any, j: number) => {
                  if (child.type === "link") {
                    return (
                      <a
                        key={j}
                        href={child.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {child.children.map((linkChild: any, k: number) =>
                          linkChild.bold ? (
                            <strong key={k}>{linkChild.text}</strong>
                          ) : (
                            linkChild.text
                          )
                        )}
                      </a>
                    );
                  } else {
                    return child.bold ? (
                      <strong key={j}>{child.text}</strong>
                    ) : (
                      child.text
                    );
                  }
                })}
              </p>
            );
          }
          break;
        case "heading":
          const level = block.level || 2;
          const Tag = `h${level}` as keyof JSX.IntrinsicElements;
          elements.push(
            <Tag key={i}>
              {block.children.map((child: any, j: number) => child.text)}
            </Tag>
          );
          break;
      }
    }
  }

  // Renderizar cualquier lista que haya quedado pendiente
  if (currentList.length > 0) {
    const ListTag = currentListFormat === "unordered" ? "ul" : "ol";
    elements.push(
      <ListTag key="final-list">
        {currentList.map((item, idx) => (
          <li key={idx}>
            {item.children.map((child: any, j: number) => (
              <span key={j}>{child.text}</span>
            ))}
          </li>
        ))}
      </ListTag>
    );
  }

  return elements;
}

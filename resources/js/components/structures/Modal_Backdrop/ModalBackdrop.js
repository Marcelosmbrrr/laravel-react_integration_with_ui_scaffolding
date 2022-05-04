export function ModalBackdrop({...props}) {

    const OverlayOne = () => (
      <ModalOverlay
        bg='blackAlpha.300'
        backdropFilter='blur(10px) hue-rotate(90deg)'
      />
    )
  
    const OverlayTwo = () => (
      <ModalOverlay
        bg='none'
        backdropFilter='auto'
        backdropInvert='80%'
        backdropBlur='2px'
      />
    )
  
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = React.useState(<OverlayOne />)
  
    return (
      <>
        <Modal isCentered isOpen={true} onClose={onClose}>
          {overlay}
          <ModalContent>
            <ModalHeader>{props.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>{props.body}</Text>
            </ModalBody>
            <ModalFooter>
                {props.state == "seted" && 
                    <Button onClick={onClose}>Continue</Button>
                }
              <Button><a href = "logout">Logout</a></Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }